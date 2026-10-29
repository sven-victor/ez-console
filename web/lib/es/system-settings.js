import { j as e, g as zt, h as Pt } from "./vendor.js";
import { App as pe, Form as o, Spin as je, Switch as de, Select as $, Input as v, Alert as tt, Divider as Ke, Space as H, Button as E, InputNumber as oe, Modal as me, Skeleton as ts, Descriptions as re, Steps as ss, Tag as ne, Table as Pe, Radio as Be, Tabs as Lt, Popconfirm as Ot, Tooltip as it, Typography as Ge, Card as ie, Row as Qe, Col as Ie, Checkbox as ut, Empty as Je, AutoComplete as Vt, Upload as ls, Tree as as, Menu as is, Collapse as ns, Timeline as os, Segmented as nt, Drawer as rs, Result as ds } from "antd";
import { useTranslation as G } from "react-i18next";
import { useState as j, useEffect as Le, useMemo as ye, Suspense as Ye, lazy as et, useCallback as xe, useRef as us } from "react";
import { useRequest as A } from "ahooks";
import { SaveOutlined as We, ReloadOutlined as _e, LoadingOutlined as cs, CheckCircleTwoTone as ms, ClearOutlined as ps, StarFilled as fs, CheckCircleOutlined as gs, StarOutlined as hs, EditOutlined as Ne, CopyOutlined as Rt, DeleteOutlined as Oe, BugOutlined as Mt, TagsOutlined as xs, PlusOutlined as De, ThunderboltOutlined as ys, ToolOutlined as ft, SettingOutlined as js, FileTextOutlined as st, EyeOutlined as Nt, UploadOutlined as kt, UnorderedListOutlined as Dt, CalendarOutlined as bs, UndoOutlined as gt, ArrowLeftOutlined as xt, FolderOutlined as qt, FileOutlined as Ut, FileAddOutlined as Vs, FolderAddOutlined as ks, SearchOutlined as vs, DownloadOutlined as _s, ApartmentOutlined as Ss, WarningOutlined as ws, DashboardOutlined as Cs, MessageOutlined as Ts, SendOutlined as Fs, CloseCircleOutlined as $t, AlignLeftOutlined as Bt, CodeOutlined as Jt, PlayCircleOutlined as Is } from "@ant-design/icons";
import { a as S } from "./index.js";
import { g as vt, h as Wt, j as Ze } from "./base.js";
import { g as ce, d as As, b as qe, L as He } from "./components.js";
import Ht from "react-quill-new";
import { b as yt, u as Es, a as jt } from "./contexts.js";
import { useNavigate as we, useLocation as zs, useParams as ot, useSearchParams as Kt } from "react-router-dom";
import { l as Ps, c as Ls, u as Os, d as Rs, g as Ms, b as Ns, e as Ds, f as qs, r as Us } from "./system.js";
import { l as $s, b as Bs } from "./authorization.js";
import { createStyles as bt } from "antd-style";
import Js from "classnames";
import lt from "@uiw/react-json-view";
import Ws from "@uiw/react-codemirror";
import { json as Hs } from "@codemirror/lang-json";
const Ue = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Ks = {
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
}, Gs = ({ initialData: l, onRefresh: t }) => {
  const { message: a } = pe.useApp(), { t: s } = G("system"), { t: n } = G("common"), [i] = o.useForm(), [r, m] = j((l == null ? void 0 : l.provider) || "custom"), [d, c] = j((l == null ? void 0 : l.provider) === "custom" || (l == null ? void 0 : l.provider) === "autoDiscover"), [f, V] = j((l == null ? void 0 : l.enabled) || !1), [x, O] = j((l == null ? void 0 : l.auto_create_user) || !1), { loading: I, data: L, refresh: _ } = A(S.system.getOauthSettings, {
    manual: !!l,
    onSuccess: (F) => {
      i.setFieldsValue(F), m(F.provider), c(F.provider === "custom" || F.provider === "autoDiscover"), V(F.enabled), O(F.auto_create_user);
    },
    onError: (F) => {
      a.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", F);
    }
  });
  Le(() => {
    l && (i.setFieldsValue(l), m(l.provider), c(l.provider === "custom" || l.provider === "autoDiscover"), V(l.enabled), O(l.auto_create_user));
  }, [l, i]);
  const q = (F) => {
    m(F), c(F === "custom" || F === "autoDiscover");
    const w = Ks[F];
    w && i.setFieldsValue({
      auth_endpoint: w.endpoints.auth_endpoint,
      token_endpoint: w.endpoints.token_endpoint,
      userinfo_endpoint: w.endpoints.userinfo_endpoint,
      scope: w.scope,
      // Set field mappings
      email_field: w.email_field,
      username_field: w.username_field,
      full_name_field: w.full_name_field,
      avatar_field: w.avatar_field,
      role_field: w.role_field,
      // Set display configuration
      icon_url: w.icon_url,
      display_name: w.display_name
    });
  }, C = (F) => {
    V(F);
  }, D = (F) => {
    O(F);
  }, { loading: g, run: J } = A(S.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      a.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), t ? t() : _();
    },
    onError: (F) => {
      a.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", F);
    }
  }), Y = (F) => {
    J(F);
  }, K = () => {
    t ? t() : _();
  }, { loading: ee, run: Q } = A(async ({ redirect_uri: F, ...w }) => {
    let M;
    return F ? M = new URL(F) : M = new URL(window.location.origin), M.pathname = vt("/system/settings/oauth/test-callback"), M.searchParams.set("provider", r), S.system.testOauthConnection({ redirect_uri: M.toString(), ...w });
  }, {
    manual: !0,
    onSuccess: ({ url: F }) => {
      window.open(F, "_blank");
    },
    onError: (F) => {
      a.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: F.message })), console.error("Failed to test OAuth connection", F);
    }
  }), te = () => r === "custom";
  return /* @__PURE__ */ e.jsx(je, { spinning: I, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: Y,
      initialValues: l || L,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: C })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "provider",
            label: s("settings.oauth.provider.label", { defaultValue: "OAuth Provider" }),
            tooltip: s("settings.oauth.provider.tooltip", { defaultValue: "Select an OAuth provider or configure a custom one." }),
            rules: [
              {
                required: f,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs($, { onChange: q, disabled: !f, children: [
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
          o.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              v,
              {
                disabled: !f,
                placeholder: r !== "custom" ? s(`settings.oauth.provider.options.${r}`, { defaultValue: r }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "icon_url",
            label: s("settings.oauth.iconUrl.label", { defaultValue: "Icon URL" }),
            tooltip: s("settings.oauth.iconUrl.tooltip", { defaultValue: "URL of the icon for this provider. Displayed on the login button." }),
            rules: [
              {
                pattern: Ue,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f, placeholder: "https://example.com/icon.png" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "client_id",
            label: s("settings.oauth.clientId.label", { defaultValue: "Client ID" }),
            tooltip: s("settings.oauth.clientId.tooltip", { defaultValue: "The Client ID provided by the OAuth provider." }),
            rules: [
              {
                required: f,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "client_secret",
            label: s("settings.oauth.clientSecret.label", { defaultValue: "Client Secret" }),
            tooltip: s("settings.oauth.clientSecret.tooltip", { defaultValue: "The Client Secret provided by the OAuth provider. This will be stored encrypted." }),
            rules: [
              {
                required: f,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v.Password, { disabled: !f, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        te() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: f && r === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Ue,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "wellknown_endpoint",
            hidden: r !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Ue,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: f && r === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f })
          }
        ),
        te() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: f && r === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Ue,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f })
          }
        ),
        te() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: f && r === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Ue,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "scope",
            label: s("settings.oauth.scope.label", { defaultValue: "Authorization Scope" }),
            tooltip: s("settings.oauth.scope.tooltip", { defaultValue: "The scopes to request from the OAuth provider, separated by spaces." }),
            rules: [
              {
                required: f,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(F) => F.getFieldValue("redirect_uri") !== "" ? {
              pattern: Ue,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f, placeholder: `http://${window.location.host}${vt(`/login?provider=settings.${r}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: D, disabled: !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: f && x,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !f || !x })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs($, { disabled: !f, children: [
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
          o.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(de, { disabled: !f })
          }
        ),
        /* @__PURE__ */ e.jsx(Ke, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          tt,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: d ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "email", disabled: !f || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "login", autoComplete: "off", disabled: !f || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "name", disabled: !f || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "avatar_url", disabled: !f || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "role", disabled: !f || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: g,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              loading: ee,
              onClick: async () => {
                const F = i.getFieldsValue();
                Q(F);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: K,
              icon: /* @__PURE__ */ e.jsx(_e, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Qs = () => {
  const { message: l } = pe.useApp(), { t } = G("system"), { t: a } = G("common"), [s] = o.useForm(), { loading: n, data: i, refresh: r } = A(S.system.getSecuritySettings, {
    onSuccess: (f) => {
      s.setFieldsValue(f);
    },
    onError: (f) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", f);
    }
  }), { loading: m, run: d } = A(S.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), r();
    },
    onError: (f) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", f);
    }
  }), c = (f) => {
    d(f);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: n, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: s,
      layout: "vertical",
      onFinish: c,
      initialValues: i,
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
            children: /* @__PURE__ */ e.jsx(oe, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
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
            shouldUpdate: (f, V) => f.login_failure_lock !== V.login_failure_lock,
            children: ({ getFieldValue: f }) => f("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(oe, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (f, V) => f.login_failure_lock !== V.login_failure_lock,
            children: ({ getFieldValue: f }) => f("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(oe, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            shouldUpdate: (f, V) => f.history_password_check !== V.history_password_check,
            children: ({ getFieldValue: f }) => f("history_password_check") ? /* @__PURE__ */ e.jsx(
              o.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(oe, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(oe, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(oe, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: m,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => r(),
              icon: /* @__PURE__ */ e.jsx(_e, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Zs = ({ fetchItems: l, importItems: t, columns: a, ...s }) => {
  const { message: n } = pe.useApp(), { t: i } = G("system"), [r, m] = j([]), [d, c] = j([]), { run: f, loading: V } = A(l, {
    onError: (I) => {
      n.error(i("settings.ldap.importError", { error: `${I.message}` }));
    },
    onSuccess: (I) => {
      m(I);
    },
    manual: !0
  }), { run: x, loading: O } = A(async () => {
    for (const I of d.filter((L) => {
      const _ = r.find((q) => q.ldap_dn === L);
      return !(!_ || _.status === "imported");
    })) {
      const L = await t([I]);
      m((_) => [..._].map((C) => {
        for (const D of L)
          if (C.ldap_dn === D.ldap_dn)
            return { ...D, status: "imported" };
        return C;
      }));
    }
  }, {
    manual: !0
  });
  return Le(() => {
    s.visible && (m([]), f(), c([]));
  }, [s.visible]), /* @__PURE__ */ e.jsx(
    me,
    {
      title: i("settings.ldap.importTitle"),
      ...s,
      onOk: () => {
        x();
      },
      width: 900,
      confirmLoading: O,
      loading: V,
      children: /* @__PURE__ */ e.jsx(
        Pe,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (I) => {
              c(I);
            },
            getCheckboxProps: (I) => ({
              disabled: I.status === "imported"
            })
          },
          columns: a.map(({ render: I, ...L }) => I ? {
            ...L,
            render: (_, q, C) => {
              const D = d.includes(q.ldap_dn) && O && q.status !== "imported";
              return I(_, q, C, D);
            }
          } : L),
          dataSource: r,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Xs = () => {
  var q, C, D;
  const { message: l } = pe.useApp(), { t } = G("system"), [a] = o.useForm(), [s, n] = j(!1), [i, r] = j(null), [m, d] = j(!1), [c, f] = j(!1), [V] = o.useForm(), [x, O] = j(!1);
  A(S.system.getLdapSettings, {
    onSuccess: (g) => {
      a.setFieldsValue(g), O(g.enabled);
    },
    onError: (g) => {
      l.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${g.message}` }));
    }
  }), Le(() => {
    r(null);
  }, [m]);
  const I = async (g) => {
    n(!0);
    try {
      await S.system.updateLdapSettings(g), l.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      l.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      n(!1);
    }
  }, { run: L, loading: _ } = A(async (g) => {
    const J = await a.validateFields();
    return await S.system.testLdapConnection({
      ...g,
      ...J
    });
  }, {
    onSuccess: (g) => {
      r(g);
    },
    onError: (g) => {
      l.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${g.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      o,
      {
        form: a,
        layout: "vertical",
        onFinish: I,
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (g) => O(g) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: x, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: x, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: x, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(v.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: x, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: x, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: x, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: x, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: x, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(v, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(v, { type: "number", defaultValue: 15, disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(Ke, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(v.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(v.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(v.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !x,
                style: { marginLeft: 8 },
                onClick: () => d(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !x,
                style: { marginLeft: 8 },
                onClick: () => {
                  f(!0);
                },
                children: t("settings.ldap.import", { defaultValue: "Import Users" })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      me,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: m,
        onCancel: () => d(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            o,
            {
              form: V,
              layout: "vertical",
              onFinish: L,
              children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(v, { disabled: !x })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(v.Password, { disabled: !x })
                  }
                ),
                /* @__PURE__ */ e.jsxs(o.Item, { children: [
                  /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { disabled: !x, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    E,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => d(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(je, { spinning: _, children: /* @__PURE__ */ e.jsx(ts, { active: _, loading: _, children: i && (i.user ? /* @__PURE__ */ e.jsxs(re, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(re.Item, { label: "Username", span: 3, children: i.user.username }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "Email", span: 3, children: i.user.email }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "FullName", span: 3, children: i.user.full_name }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "CreatedAt", span: 3, children: i.user.created_at }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "UpdatedAt", span: 3, children: i.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            ss,
            {
              direction: "vertical",
              current: (q = i.message) == null ? void 0 : q.findIndex((g) => !g.success),
              status: (C = i.message) != null && C.find((g) => !g.success) ? "error" : "finish",
              items: (D = i.message) == null ? void 0 : D.map((g) => ({
                status: g.success ? "finish" : "error",
                title: g.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      Zs,
      {
        visible: c,
        onCancel: () => f(!1),
        fetchItems: () => S.system.importLdapUsers({}),
        importItems: (g) => S.system.importLdapUsers({ user_dn: g }),
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
          render: (g, J, Y, K) => K ? /* @__PURE__ */ e.jsx(je, { indicator: /* @__PURE__ */ e.jsx(cs, { spin: !0 }) }) : g ? /* @__PURE__ */ e.jsx(ms, { twoToneColor: "#52c41a" }) : J.id ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ne, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Ys = () => {
  const { message: l } = pe.useApp(), { t } = G("system"), { t: a } = G("common"), [s] = o.useForm(), [n, i] = j(null), [r, m] = j(!1), [d] = o.useForm(), [c, f] = j(!1), { data: V } = A(S.system.getSmtpSettingFields), { loading: x } = A(S.system.getSmtpSettings, {
    onSuccess: (C) => {
      s.setFieldsValue(C), f(C.enabled);
    },
    onError: (C) => {
      l.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${C.message}` }));
    }
  });
  Le(() => {
    i(null);
  }, [r]);
  const { run: O, loading: I } = A(({ port: C, ...D }) => S.system.updateSmtpSettings({ ...D, port: Number(C) }), {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (C) => {
      l.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${C.message}` }));
    }
  }), { run: L, loading: _ } = A(async (C) => {
    const { port: D, ...g } = await s.validateFields();
    return await S.system.testSmtpConnection({
      ...C,
      ...g,
      port: Number(D)
    });
  }, {
    onSuccess: (C) => {
      i(C);
    },
    onError: (C) => {
      l.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${C.message}` }));
    },
    manual: !0
  }), q = (C) => {
    switch (C.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(oe, { style: { width: "100%" }, disabled: !c, min: C.min, max: C.max, step: C.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(oe, { style: { width: "100%" }, disabled: !c, min: 0, max: 100, step: C.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx($, { mode: "tags", tokenSeparators: [","], disabled: !c });
      case "enum":
        return /* @__PURE__ */ e.jsx($, { disabled: !c, options: C.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Ht, { theme: "snow", readOnly: !c });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(v, { disabled: !c });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(je, { spinning: x, children: /* @__PURE__ */ e.jsxs(
      o,
      {
        form: s,
        layout: "vertical",
        onFinish: O,
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (C) => f(C) })
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
              children: /* @__PURE__ */ e.jsxs(Be.Group, { disabled: !c, children: [
                /* @__PURE__ */ e.jsx(Be.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Be.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Be.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
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
          /* @__PURE__ */ e.jsx(Ke, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (V || []).map((C) => /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t(C.label_key || `settings.smtp.${C.key}`, { defaultValue: C.key }),
              name: C.key,
              tooltip: C.tooltip_key ? t(C.tooltip_key, { defaultValue: "" }) : void 0,
              children: q(C)
            },
            C.key
          )),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: I, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              E,
              {
                onClick: () => m(!0),
                disabled: !c || _,
                loading: _,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      me,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: r,
        onCancel: () => m(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => m(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(E, { type: "primary", loading: _, onClick: () => d.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: d,
            layout: "vertical",
            onFinish: (C) => L(C),
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
              n && /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: n.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: n.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, el = () => {
  const { message: l } = pe.useApp(), { t, i18n: a } = G("system"), { t: s } = G("common"), [n] = o.useForm(), { fetchSiteConfig: i, currentOrgId: r } = yt(), { user: m } = Es(), d = o.useWatch("enable_multi_org", n), c = o.useWatch("default_organization_id", n), f = ye(() => {
    var J;
    const g = (J = m == null ? void 0 : m.organizations) == null ? void 0 : J.find((Y) => Y.id === r);
    return g != null && g.name ? `${g.name} (${r})` : r || "";
  }, [m == null ? void 0 : m.organizations, r]), V = ye(() => {
    var J;
    const g = (J = m == null ? void 0 : m.organizations) == null ? void 0 : J.find((Y) => Y.id === c);
    return g != null && g.name ? `${g.name} (${c})` : c || "";
  }, [m == null ? void 0 : m.organizations, c]), { loading: x, data: O, refresh: I } = A(S.system.getSystemBaseSettings, {
    onSuccess: (g) => {
      n.setFieldsValue(g);
    },
    onError: (g) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", g);
    }
  }), { loading: L, run: _ } = A(S.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: async () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), I(), await i();
    },
    onError: (g) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", g);
    }
  }), { loading: q, run: C } = A(S.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      l.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (g) => {
      l.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", g);
    }
  }), D = (g) => {
    _(g);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: x, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: n,
      layout: "vertical",
      onFinish: D,
      initialValues: O,
      children: [
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Lt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", children: /* @__PURE__ */ e.jsx(v, {}) }) })
        }, ...As.map((g) => ({
          key: g.lang,
          label: a.language !== g.lang ? s(`language.${g.lang}`, { defaultValue: g.label, lang: g.label }) : g.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: ["name_i18n", g.lang], children: /* @__PURE__ */ e.jsx(v, {}) }) })
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
            tooltip: t("settings.base.enableMultiOrgTooltip", {
              defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab. When disabled, the current organization becomes the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { name: "default_organization_id", hidden: !0, children: /* @__PURE__ */ e.jsx(v, {}) }),
        !d && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.defaultOrganization", { defaultValue: "Default Organization" }),
            tooltip: t("settings.base.defaultOrganizationTooltip", {
              defaultValue: "Used when multi-organization is disabled. Switching multi-organization off sets this to the currently selected organization."
            }),
            children: /* @__PURE__ */ e.jsx(v, { value: V, disabled: !0 })
          }
        ),
        d && f && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.currentOrganization", { defaultValue: "Current Organization" }),
            tooltip: t("settings.base.currentOrganizationTooltip", {
              defaultValue: "If you disable multi-organization, this organization will become the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(v, { value: f, disabled: !0 })
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
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.showToolCalls", { defaultValue: "Show tool calls" }),
            name: "show_tool_calls",
            valuePropName: "checked",
            tooltip: t("settings.base.showToolCallsTooltip", {
              defaultValue: "When enabled, AI chat shows server tool calls under each assistant message. Client tools and confirmation cards are unchanged."
            }),
            children: /* @__PURE__ */ e.jsx(de, {})
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: L,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => I(),
              icon: /* @__PURE__ */ e.jsx(_e, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Ot,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => C(),
              children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ps, {}), loading: q, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, tl = et(() => import("./components.js").then((l) => l.r).then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: _t } = v, sl = ({ schema: l, uiSchema: t, name: a, provider: s }) => {
  const { t: n } = G("ai", { keyPrefix: `models.${s}.form` });
  return /* @__PURE__ */ e.jsx(
    tl,
    {
      name: a,
      schema: l,
      uiSchema: t,
      t: n
    }
  );
}, ll = () => {
  var y;
  const { message: l, modal: t } = pe.useApp(), { t: a } = G("ai"), { t: s } = G("common"), n = we(), { hasPermission: i } = jt(), r = i("ai:models:update"), [m] = o.useForm(), [d, c] = j(!1), [f, V] = j(null), [x, O] = j(""), [I, L] = j(""), [_, q] = j(!1), [C, D] = j(!1), [g, J] = j(!1), [Y, K] = j([]), [ee, Q] = j({}), [te, F] = j({}), [w, M] = j([]), { loading: W, data: k } = A(
    () => S.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (u) => {
        l.error(a("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", u);
      }
    }
  ), h = ye(() => k == null ? void 0 : k.find((u) => u.provider === I), [k, I]), { loading: R, data: N, refresh: B } = A(
    () => S.ai.listAiModels({ current: 1, page_size: 100, search: x }),
    {
      refreshDeps: [x],
      onError: (u) => {
        l.error(a("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", u);
      }
    }
  ), { loading: Z, run: ue } = A(
    ({ config: u, ...b }) => S.ai.createAiModel({ config: u ?? {}, ...b }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("models.createSuccess", { defaultValue: "AI model created successfully" })), c(!1), m.resetFields(), B();
      },
      onError: (u) => {
        l.error(a("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", u);
      }
    }
  ), { loading: ge, run: Ae } = A(
    ({ id: u, data: b }) => S.ai.updateAiModel({ id: u }, b),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("models.updateSuccess", { defaultValue: "AI model updated successfully" })), c(!1), m.resetFields(), V(null), B();
      },
      onError: (u) => {
        l.error(a("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", u);
      }
    }
  ), { runAsync: Ee } = A(
    (u) => S.ai.deleteAiModel({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), B();
      },
      onError: (u) => {
        l.error(a("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", u);
      }
    }
  ), { runAsync: ze } = A(
    (u) => S.ai.testAiModel({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (u) => {
        l.error(a("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", u);
      }
    }
  ), { runAsync: Ce } = A(
    (u) => S.ai.setDefaultAiModel({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), B();
      },
      onError: (u) => {
        l.error(a("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", u);
      }
    }
  ), be = Y.some(
    (u) => (ee[u.key] ?? "") !== (te[u.key] ?? "")
  ), Ve = (u, b) => a(`models.purposes.${u}.label`, { defaultValue: b || u }), T = async () => {
    q(!0), D(!0);
    try {
      const [u, b] = await Promise.all([
        S.ai.listAiModelPurposes(),
        S.ai.listAiModels({ current: 1, page_size: 100, search: "" })
      ]), U = {};
      for (const X of u)
        U[X.key] = X.model_id ?? "";
      K(u), F(U), Q(U), M(b.data ?? []);
    } catch (u) {
      l.error(a("models.purposeFetchFailed", { defaultValue: "Failed to load purpose assignments" })), console.error("Failed to load purpose assignments:", u), q(!1);
    } finally {
      D(!1);
    }
  }, ae = () => {
    g || q(!1);
  }, fe = async () => {
    const u = Y.filter(
      (b) => (ee[b.key] ?? "") !== (te[b.key] ?? "")
    );
    if (u.length === 0) {
      q(!1);
      return;
    }
    J(!0);
    try {
      for (const b of u)
        await S.ai.setAiModelPurpose({ purpose: b.key }, { model_id: ee[b.key] ?? "" });
      l.success(a("models.purposeSaveSuccess", { defaultValue: "Purpose assignments saved" })), q(!1), B();
    } catch (b) {
      l.error(a("models.purposeSaveFailed", { defaultValue: "Failed to save purpose assignments" })), console.error("Failed to save purpose assignments:", b), B();
    } finally {
      J(!1);
    }
  }, Te = (u) => {
    const b = u.purposes ?? [];
    if (b.length > 0) {
      t.warning({
        title: a("models.deleteBlockedTitle", { defaultValue: "This model cannot be deleted" }),
        content: a("models.deletePurposeConfirm", {
          defaultValue: "This model is used for: {{purposes}}. Unassign those purposes before deleting it.",
          purposes: b.map((U) => Ve(U)).join(", ")
        })
      });
      return;
    }
    Ee(u.id);
  }, Re = () => {
    V(null), L(""), m.resetFields(), c(!0);
  }, z = (u) => {
    V(u), L(u.provider);
    const b = u.config || {}, U = {
      name: u.name,
      description: u.description,
      provider: u.provider,
      is_default: u.is_default,
      config: b,
      // Spread config fields to form
      status: u.status,
      system_prompt: u.system_prompt ?? "",
      max_chat_tokens: u.max_chat_tokens ?? 0,
      max_chat_iterations: u.max_chat_iterations ?? 0
    };
    m.setFieldsValue(U), c(!0);
  }, p = async (u) => {
    V(null), L(u.provider), m.resetFields();
    try {
      const b = await S.ai.getAiModel({ id: u.id }), U = { ...b.config || {} };
      "api_key" in U && (U.api_key = ""), m.setFieldsValue({
        name: `${b.name} (copy)`,
        description: b.description,
        provider: b.provider,
        config: U,
        is_default: !1,
        status: "enabled",
        system_prompt: b.system_prompt ?? "",
        max_chat_tokens: b.max_chat_tokens ?? 0,
        max_chat_iterations: b.max_chat_iterations ?? 0
      }), c(!0);
    } catch {
      l.error(a("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, P = (u) => {
    L(u), m.setFieldValue("config", void 0);
  }, le = (u) => {
    const b = u.config ?? {}, U = {
      name: u.name,
      description: u.description,
      provider: u.provider,
      config: b,
      is_default: u.is_default,
      status: u.status,
      system_prompt: u.system_prompt ?? "",
      max_chat_tokens: u.max_chat_tokens ?? 0,
      max_chat_iterations: u.max_chat_iterations ?? 0
    };
    f ? Ae({ id: f.id, data: U }) : ue(U);
  }, Se = [
    {
      title: a("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (u, b) => /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx("span", { children: u }),
        b.is_default && /* @__PURE__ */ e.jsx(it, { title: a("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(fs, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: a("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (u) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: u.toUpperCase() })
    },
    {
      title: a("models.purposesColumn", { defaultValue: "Purposes" }),
      dataIndex: "purposes",
      key: "purposes",
      render: (u) => /* @__PURE__ */ e.jsx(H, { size: [4, 4], wrap: !0, children: (u ?? []).map((b) => /* @__PURE__ */ e.jsx(ne, { children: Ve(b) }, b)) })
    },
    {
      title: a("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (u) => /* @__PURE__ */ e.jsx(ne, { color: u === "enabled" ? "green" : "red", children: u === "enabled" ? s("enabled", { defaultValue: "Enabled" }) : s("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (u, b) => /* @__PURE__ */ e.jsx(qe, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(gs, {}),
          tooltip: a("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => ze(b.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(hs, {}),
          disabled: b.is_default,
          tooltip: a("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => Ce(b.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          tooltip: a("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => z(b)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(Rt, {}),
          tooltip: a("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => p(b)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          tooltip: a("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => Te(b),
          danger: !0
        }
      ] }, "actions")
    }
  ], Me = w.find((u) => u.is_default && u.status === "enabled"), rt = [
    {
      title: a("models.purpose", { defaultValue: "Purpose" }),
      dataIndex: "key",
      width: 140,
      render: (u, b) => Ve(u, b.name)
    },
    {
      title: a("models.purposeDescription", { defaultValue: "Description" }),
      dataIndex: "description",
      render: (u, b) => a(`models.purposes.${b.key}.description`, { defaultValue: u })
    },
    {
      title: a("models.purposeModel", { defaultValue: "Model" }),
      key: "model",
      width: 280,
      render: (u, b) => {
        const U = ee[b.key] ?? "", X = w.some((ke) => ke.id === U), se = w.filter((ke) => ke.status === "enabled" || ke.id === U).map((ke) => ({
          label: ke.name,
          value: ke.id,
          disabled: ke.status !== "enabled"
        }));
        U && !X && se.push({
          label: b.model_name || U,
          value: U,
          disabled: !0
        });
        const Fe = w.find((ke) => ke.id === U), dt = !!U && ((Fe == null ? void 0 : Fe.status) === "disabled" || !Fe && b.model_status === "disabled" && U === b.model_id);
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            $,
            {
              allowClear: !0,
              style: { width: "100%" },
              disabled: !r,
              placeholder: Me ? a("models.purposePlaceholder", { defaultValue: "Default: {{name}}", name: Me.name }) : a("models.purposeNoDefault", { defaultValue: "Use the default model" }),
              value: U || void 0,
              options: se,
              onChange: (ke) => {
                Q((es) => ({ ...es, [b.key]: ke ?? "" }));
              }
            }
          ),
          dt && /* @__PURE__ */ e.jsx(Ge.Text, { type: "warning", children: a("models.purposeDisabledFallback", {
            defaultValue: "This model is disabled. The purpose is using the default model."
          }) })
        ] });
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsx(
        v.Search,
        {
          placeholder: a("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (u) => O(u),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(Mt, {}),
            onClick: () => n("/system/settings/ai-trace"),
            children: a("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(xs, {}),
            onClick: T,
            children: a("models.assignPurposes", { defaultValue: "Assign purposes" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(_e, {}),
            onClick: B,
            loading: R,
            children: s("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(De, {}),
            onClick: Re,
            children: a("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(
      Pe,
      {
        columns: Se,
        dataSource: (N == null ? void 0 : N.data) || [],
        loading: R,
        rowKey: "id",
        pagination: {
          total: (N == null ? void 0 : N.total) || 0,
          current: (N == null ? void 0 : N.current) || 1,
          pageSize: (N == null ? void 0 : N.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (u, b) => s("pagination.total", {
            defaultValue: `${b[0]}-${b[1]} of ${u} items`,
            start: b[0],
            end: b[1],
            total: u
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      me,
      {
        title: f ? a("models.edit", { defaultValue: "Edit AI Model" }) : a("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          c(!1), m.resetFields(), V(null);
        },
        footer: null,
        width: ((y = h == null ? void 0 : h.ui_schema) == null ? void 0 : y["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: m,
            layout: "vertical",
            onFinish: le,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: a("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: a("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(v, { placeholder: a("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: a("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      _t,
                      {
                        rows: 3,
                        placeholder: a("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "provider",
                    label: a("models.provider", { defaultValue: "Provider" }),
                    rules: [{ required: !0, message: a("models.providerRequired", { defaultValue: "Please select provider" }) }],
                    children: /* @__PURE__ */ e.jsx(
                      $,
                      {
                        loading: W,
                        placeholder: a("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: P,
                        value: I,
                        options: k == null ? void 0 : k.map((u) => ({
                          label: u.name,
                          value: u.provider
                        }))
                      }
                    )
                  }
                ),
                h && /* @__PURE__ */ e.jsx(Ye, { fallback: /* @__PURE__ */ e.jsx(He, {}), children: /* @__PURE__ */ e.jsx(
                  sl,
                  {
                    name: "config",
                    schema: h.config_schema,
                    uiSchema: h.ui_schema,
                    provider: I
                  }
                ) }),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "system_prompt",
                    label: a("models.systemPrompt", { defaultValue: "System Prompt" }),
                    tooltip: a("models.systemPromptHelp", {
                      defaultValue: "Optional system prompt prepended to every conversation for this model."
                    }),
                    children: /* @__PURE__ */ e.jsx(
                      _t,
                      {
                        rows: 4,
                        placeholder: a("models.systemPromptPlaceholder", {
                          defaultValue: "Enter system prompt (optional)"
                        })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsxs(Qe, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(Ie, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_tokens",
                      label: a("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: a("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(Ie, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_iterations",
                      label: a("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: a("models.maxChatIterationsHelp", {
                        defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "is_default",
                    valuePropName: "checked",
                    label: a("models.setAsDefault", { defaultValue: "Set as default model" }),
                    children: /* @__PURE__ */ e.jsx(de, {})
                  }
                ),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: a("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(v, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: Z || ge,
                    children: f ? s("update", { defaultValue: "Update" }) : s("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      c(!1), m.resetFields(), V(null), L("");
                    },
                    children: s("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsxs(
      me,
      {
        title: a("models.assignPurposesTitle", { defaultValue: "Assign purposes" }),
        open: _,
        onCancel: ae,
        width: 760,
        destroyOnHidden: !0,
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: ae, disabled: g, children: s("cancel", { defaultValue: "Cancel" }) }, "cancel"),
          r ? /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              loading: g,
              disabled: !be || C,
              onClick: fe,
              children: s("ok", { defaultValue: "OK" })
            },
            "ok"
          ) : null
        ],
        children: [
          /* @__PURE__ */ e.jsx(Ge.Paragraph, { type: "secondary", children: a("models.assignPurposesHelp", {
            defaultValue: "Leave a purpose empty to use the default model. Only changed rows are saved."
          }) }),
          /* @__PURE__ */ e.jsx(
            Pe,
            {
              columns: rt,
              dataSource: Y,
              loading: C,
              rowKey: "key",
              pagination: !1
            }
          )
        ]
      }
    )
  ] });
}, al = et(() => import("./components.js").then((l) => l.r).then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: il } = v, nl = ({ schema: l, uiSchema: t, name: a, type: s }) => {
  const { t: n } = G("system", { keyPrefix: `settings.toolsets.${s}.form` });
  return /* @__PURE__ */ e.jsx(
    al,
    {
      name: a,
      schema: l,
      uiSchema: t,
      t: n
    }
  );
}, ol = () => {
  var z;
  const { message: l } = pe.useApp(), { t } = G("system"), { t: a } = G("common"), s = we(), [n] = o.useForm(), [i, r] = j(!1), [m, d] = j(null), [c, f] = j(""), [V, x] = j(!1), [O, I] = j(null), [L, _] = j(""), [q, C] = j(!1), [D, g] = j([]), [J, Y] = j(), [K, ee] = j("user"), [Q, te] = j(null), { loading: F, data: w, refresh: M } = A(
    () => S.system.listToolSets({
      current: 1,
      page_size: 100,
      search: c,
      type: J,
      is_preset: K === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [c, J, K],
      onError: (p) => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", p);
      }
    }
  ), { loading: W, data: k } = A(
    () => S.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (p) => {
        l.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", p);
      }
    }
  ), h = ye(() => k == null ? void 0 : k.find((p) => p.tool_set_type === L), [k, L]), R = ye(() => (k ?? []).filter(
    (p) => p.allow_manual_create || p.tool_set_type === (m == null ? void 0 : m.type)
  ), [k, m]), { loading: N, run: B } = A(
    (p) => S.system.createToolSet({
      ...p,
      type: p.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), r(!1), n.resetFields(), M();
      },
      onError: (p) => {
        l.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", p);
      }
    }
  ), { loading: Z, run: ue } = A(
    ({ id: p, data: P }) => S.system.updateToolSet({ id: p }, {
      ...P,
      type: P.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), r(!1), n.resetFields(), d(null), M();
      },
      onError: (p) => {
        l.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", p);
      }
    }
  ), { run: ge } = A(
    (p) => S.system.deleteToolSet({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), M();
      },
      onError: (p) => {
        l.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", p);
      }
    }
  ), { runAsync: Ae } = A(
    (p) => S.system.testToolSet({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (p) => {
        l.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", p);
      }
    }
  ), { loading: Ee, runAsync: ze } = A(
    (p) => S.system.getToolSetTools({ id: p }),
    {
      manual: !0,
      onSuccess: (p) => {
        g(p || []), C(!0);
      },
      onError: (p) => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", p);
      }
    }
  ), Ce = xe(
    async (p, P) => {
      te(p.id);
      try {
        await S.system.updateToolSetStatus(
          { id: p.id },
          { status: P ? "enabled" : "disabled" }
        ), l.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), M();
      } catch (le) {
        l.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", le);
      } finally {
        te(null);
      }
    },
    [t, M]
  ), be = () => {
    d(null), n.resetFields(), _(""), r(!0);
  }, Ve = (p) => {
    d(p), _(p.type);
    const P = { ...p };
    n.setFieldsValue(P), r(!0);
  }, T = (p) => {
    _(p), n.setFieldValue("config", {});
  }, ae = (p) => {
    m ? ue({ id: m.id, data: p }) : B(p);
  }, fe = (p) => {
    ge(p);
  }, Te = (p) => {
    I(p), x(!0);
  }, Re = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (p, P) => /* @__PURE__ */ e.jsxs(H, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: p }),
        P.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (p) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: p.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (p, P) => {
        const le = P.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: le ? "green" : "red", children: le ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              it,
              {
                title: le ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: le,
                    loading: Q === P.id,
                    onChange: (Se) => void Ce(P, Se)
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
      render: (p, P) => /* @__PURE__ */ e.jsx(qe, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(Mt, {}),
          disabled: P.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${P.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(ys, {}),
          disabled: P.status !== "enabled",
          onClick: async () => Ae(P.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(ft, {}),
          permission: "system:toolsets:view",
          disabled: P.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => ze(P.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(js, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => Te(P.config),
          disabled: !P.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: P.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          onClick: async () => Ve(P),
          disabled: !!P.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          permission: "system:toolsets:delete",
          tooltip: P.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : a("delete", { defaultValue: "Delete" }),
          onClick: async () => fe(P.id),
          danger: !0,
          disabled: !!P.is_preset,
          confirm: P.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => fe(P.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          v.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (p) => f(p),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          $,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: J,
            onChange: (p) => Y(p),
            options: k == null ? void 0 : k.map((p) => ({
              label: p.name,
              value: p.tool_set_type
            })),
            style: { minWidth: 200 },
            allowClear: !0,
            showSearch: !0,
            children: [
              /* @__PURE__ */ e.jsx($.Option, { value: "", children: "All" }),
              k == null ? void 0 : k.map((p) => /* @__PURE__ */ e.jsx($.Option, { value: p.tool_set_type, children: p.name }, p.tool_set_type))
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(
          Be.Group,
          {
            optionType: "button",
            value: K,
            onChange: (p) => ee(p.target.value),
            options: [
              { value: "user", label: t("settings.toolsets.scopeUser", { defaultValue: "User toolsets" }) },
              { value: "all", label: t("settings.toolsets.scopeAll", { defaultValue: "All toolsets" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(_e, {}),
            onClick: M,
            loading: F,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(De, {}),
            onClick: be,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(
      Pe,
      {
        columns: Re,
        dataSource: (w == null ? void 0 : w.data) || [],
        loading: F,
        rowKey: "id",
        pagination: {
          total: (w == null ? void 0 : w.total) || 0,
          current: (w == null ? void 0 : w.current) || 1,
          pageSize: (w == null ? void 0 : w.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (p, P) => a("pagination.total", {
            defaultValue: `${P[0]}-${P[1]} of ${p} items`,
            start: P[0],
            end: P[1],
            total: p
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      me,
      {
        title: m ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          r(!1), n.resetFields(), d(null), _("");
        },
        footer: null,
        width: ((z = h == null ? void 0 : h.ui_schema) == null ? void 0 : z["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: ae,
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
                      il,
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
                        loading: W,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: T,
                        value: L,
                        options: R.map((p) => ({
                          label: p.name,
                          value: p.tool_set_type
                        })),
                        showSearch: !0
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(Ye, { fallback: /* @__PURE__ */ e.jsx(He, {}), children: /* @__PURE__ */ e.jsx(
                  nl,
                  {
                    name: "config",
                    schema: h == null ? void 0 : h.config_schema,
                    uiSchema: h == null ? void 0 : h.ui_schema,
                    type: L
                  }
                ) }),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(v, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: N || Z,
                    children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      r(!1), n.resetFields(), d(null), _("");
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
      me,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: V,
        onCancel: () => x(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => x(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(O, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      me,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: q,
        onCancel: () => C(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => C(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: Ee ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(_e, { style: { fontSize: 24 }, spin: !0 }) }) : D.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : D.map((p, P) => {
          var le, Se, Me;
          return /* @__PURE__ */ e.jsx(
            ie,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(ft, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((le = p.function) == null ? void 0 : le.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Qe, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Ie, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((Se = p.function) == null ? void 0 : Se.description) || "-" })
                ] }),
                ((Me = p.function) == null ? void 0 : Me.parameters) && /* @__PURE__ */ e.jsxs(Ie, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(p.function.parameters, null, 2) })
                ] })
              ] })
            },
            P
          );
        }) })
      }
    )
  ] });
}, { TextArea: St } = v;
function rl(l, t) {
  const a = {}, s = [], n = new Map(t.map((i) => [i.id, i]));
  for (const i of l) {
    if (i.toolset_id === "*") {
      s.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
      continue;
    }
    const r = n.get(i.toolset_id);
    if (!r) {
      s.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
      continue;
    }
    const m = (r.tools || []).map((d) => d.name);
    if (i.tool_name === "*") {
      a[i.toolset_id] = [...m];
      continue;
    }
    m.includes(i.tool_name) ? (a[i.toolset_id] || (a[i.toolset_id] = []), a[i.toolset_id].includes(i.tool_name) || a[i.toolset_id].push(i.tool_name)) : s.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
  }
  return { selections: a, extraPatterns: s };
}
function dl(l, t) {
  const a = [], s = /* @__PURE__ */ new Set();
  for (const [n, i] of Object.entries(l))
    for (const r of i) {
      const m = `${n}|${r}`;
      s.has(m) || (s.add(m), a.push({ toolset_id: n, tool_name: r }));
    }
  for (const n of t) {
    const i = n.toolset_id.trim(), r = n.tool_name.trim();
    if (!i || !r)
      continue;
    const m = `${i}|${r}`;
    s.has(m) || (s.add(m), a.push({ toolset_id: i, tool_name: r }));
  }
  return a;
}
function Gt(l, t) {
  const a = t.trim();
  return !a || l.some((s) => s.value === a) ? l : [...l, { value: a, label: a }];
}
function ul(l, t, a, s) {
  const i = [{ value: "*", label: s }], r = /* @__PURE__ */ new Set(["*"]), m = (d, c) => {
    r.has(d) || (r.add(d), i.push({
      value: d,
      label: c ? `${d} — ${c}` : d
    }));
  };
  if (t && t !== "*") {
    const d = l.find((c) => c.id === t);
    for (const c of (d == null ? void 0 : d.tools) || [])
      m(c.name, c.description);
  } else
    for (const d of l)
      for (const c of d.tools || [])
        m(c.name, c.description);
  return Gt(i, a);
}
const cl = () => {
  const { message: l } = pe.useApp(), { t } = G("system"), { t: a } = G("common"), s = we(), { enableSkillToolBinding: n } = yt(), [i] = o.useForm(), [r, m] = j(""), [d, c] = j(), [f, V] = j("user"), [x, O] = j(!1), [I, L] = j(null), [_, q] = j(null), [C, D] = j(!1), [g] = o.useForm(), [J, Y] = j(!1), [K, ee] = j(null), [Q, te] = j([]), [F, w] = j({}), [M, W] = j([]), [k, h] = j(!1), R = ye(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...Q.map((y) => ({
      value: y.id,
      label: `${y.name} (${y.id})`
    }))
  ], [Q, t]), N = xe(() => {
    te([]), w({}), W([]);
  }, []), { loading: B, data: Z, refresh: ue } = A(
    () => S.system.listSkills({
      current: 1,
      page_size: 100,
      search: r || void 0,
      domain: d,
      is_preset: f === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [r, d, f],
      onError: () => {
        l.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: ge = [] } = A(() => S.system.listSkillDomains()), Ae = (Z == null ? void 0 : Z.data) || [], Ee = (Z == null ? void 0 : Z.total) || 0, { run: ze } = A(
    (y) => S.system.deleteSkill({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), ue();
      },
      onError: () => {
        l.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Ce = xe(
    async (y, u) => {
      ee(y.id);
      try {
        await S.system.updateSkillStatus({ id: y.id }, { status: u ? "enabled" : "disabled" }), l.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ue();
      } catch {
        l.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        ee(null);
      }
    },
    [t, ue]
  ), { loading: be, run: Ve } = A(
    (y) => S.system.uploadSkill(y.body, y.file),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), D(!1), g.resetFields(), ue();
      },
      onError: () => {
        l.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), T = xe(
    async (y) => {
      var u;
      h(!0);
      try {
        const [b, U] = await Promise.all([
          S.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          S.system.listSkillAiToolBindings(
            { id: y, current: 1, page_size: 1e3 }
          )
        ]), X = ((u = b.data) == null ? void 0 : u.filter((dt) => dt.status === "enabled")) || [];
        te(X);
        const { selections: se, extraPatterns: Fe } = rl(U.data || [], X);
        w(se), W(Fe);
      } catch {
        l.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), N();
      } finally {
        h(!1);
      }
    },
    [N, t]
  );
  Le(() => {
    !x || !(I != null && I.id) || !n || T(I.id);
  }, [x, I == null ? void 0 : I.id, n, T]);
  const ae = (y, u) => {
    w((b) => ({ ...b, [y]: u }));
  }, fe = (y, u, b) => {
    w((U) => ({
      ...U,
      [y]: b ? [...u] : []
    }));
  }, Te = () => {
    L(null), q(null), i.resetFields(), N(), O(!0);
  }, Re = (y) => {
    L(y), q(null), i.setFieldsValue({
      name: y.name,
      description: y.description,
      category: y.category,
      domain: y.domain
    }), N(), O(!0);
  }, z = (y) => {
    L(null), q(y), i.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: y.name, defaultValue: "{{name}} (copy)" }),
      description: y.description,
      category: y.category,
      domain: y.domain
    }), N(), O(!0);
  }, p = () => {
    i.validateFields().then(async (y) => {
      Y(!0);
      try {
        if (I) {
          const u = {
            name: y.name,
            description: y.description ?? "",
            category: y.category ?? "",
            domain: y.domain ?? ""
          };
          if (await S.system.updateSkill({ id: I.id }, u), n) {
            const b = dl(F, M);
            await S.system.replaceSkillAiToolBindings(
              { id: I.id },
              { bindings: b }
            );
          }
          l.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (_) {
          const u = {
            source_id: _.id,
            name: y.name,
            description: y.description ?? "",
            category: y.category ?? "",
            domain: y.domain ?? ""
          }, { id: b } = await S.system.cloneSkill(u);
          l.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), O(!1), q(null), i.resetFields(), N(), ue(), b && s(`/system/settings/skills/${b}/edit`);
          return;
        } else {
          const u = {
            name: y.name,
            description: y.description ?? "",
            category: y.category ?? "",
            domain: y.domain ?? "",
            content: y.content ?? ""
          };
          await S.system.createSkill(u), l.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        O(!1), L(null), q(null), i.resetFields(), N(), ue();
      } catch {
        l.error(
          I ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : _ ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        Y(!1);
      }
    });
  }, P = () => {
    var X, se;
    const y = (X = g.getFieldValue("file")) == null ? void 0 : X.fileList, u = ((se = y == null ? void 0 : y[0]) == null ? void 0 : se.originFileObj) ?? (y == null ? void 0 : y[0]);
    if (!u) {
      l.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const b = g.getFieldValue("category"), U = g.getFieldValue("domain");
    Ve({ body: { category: b, domain: U }, file: u });
  }, le = n && I, Se = le ? 720 : 560, Me = !I && !_, rt = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (y, u) => /* @__PURE__ */ e.jsxs(H, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: y }),
        u.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (y) => y ? /* @__PURE__ */ e.jsx(ne, { children: y }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (y) => y ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: y }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (y, u) => {
        const b = u.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: b ? "green" : "red", children: b ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              it,
              {
                title: b ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: b,
                    loading: K === u.id,
                    onChange: (U) => void Ce(u, U)
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
      render: (y, u) => /* @__PURE__ */ e.jsx(
        qe,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(st, {}),
              tooltip: u.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${u.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!u.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Nt, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${u.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              tooltip: u.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => Re(u),
              permission: "system:skills:update",
              disabled: !!u.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(Rt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => z(u),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              tooltip: u.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!u.is_preset,
              confirm: u.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: a("confirm", { defaultValue: "Confirm" }),
                cancelText: a("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => ze(u.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Qe, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(H, { children: [
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
            style: { width: 200 },
            value: d,
            onChange: c,
            options: ge.map((y) => ({ value: y, label: y }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          Be.Group,
          {
            optionType: "button",
            value: f,
            onChange: (y) => V(y.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: () => ue(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: Te, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(kt, {}), onClick: () => D(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ie, { children: [
      /* @__PURE__ */ e.jsx(
        Pe,
        {
          rowKey: "id",
          loading: B,
          columns: rt,
          dataSource: Ae,
          pagination: { total: Ee, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        me,
        {
          title: I ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : _ ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: x,
          onOk: p,
          onCancel: () => {
            O(!1), L(null), q(null), N();
          },
          confirmLoading: J,
          width: Se,
          children: /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(St, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: ge.map((y) => ({ value: y, label: y })) }) }),
            Me && /* @__PURE__ */ e.jsx(o.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(St, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            le && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(je, { spinning: k, children: Q.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(H, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: Q.map((y) => {
                const u = (y.tools || []).map((se) => se.name), b = F[y.id] || [], U = u.length > 0 && b.length === u.length, X = b.length > 0 && b.length < u.length;
                return /* @__PURE__ */ e.jsx(
                  ie,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        ut,
                        {
                          checked: U,
                          indeterminate: X,
                          onChange: (se) => fe(y.id, u, se.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: y.name })
                    ] }),
                    extra: y.description ? /* @__PURE__ */ e.jsx("span", { children: y.description }) : void 0,
                    children: (y.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(ut.Group, { style: { width: "100%" }, value: b, onChange: (se) => ae(y.id, se), children: /* @__PURE__ */ e.jsx(H, { direction: "vertical", style: { width: "100%" }, children: (y.tools || []).map((se) => /* @__PURE__ */ e.jsx(ut, { value: se.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: se.name }),
                      se.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: se.description })
                    ] }) }, se.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Je,
                      {
                        image: Je.PRESENTED_IMAGE_SIMPLE,
                        description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                      }
                    )
                  },
                  y.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, children: [
                  M.map((y, u) => /* @__PURE__ */ e.jsxs(
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
                          Vt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: y.toolset_id,
                            options: Gt(R, y.toolset_id),
                            filterOption: (b, U) => {
                              const X = U;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes(b.toLowerCase());
                            },
                            onChange: (b) => {
                              const U = typeof b == "string" ? b : "";
                              W(
                                (X) => X.map((se, Fe) => Fe === u ? { ...se, toolset_id: U } : se)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          Vt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: y.tool_name,
                            options: ul(
                              Q,
                              y.toolset_id,
                              y.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (b, U) => {
                              const X = U;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes(b.toLowerCase());
                            },
                            onChange: (b) => {
                              const U = typeof b == "string" ? b : "";
                              W(
                                (X) => X.map((se, Fe) => Fe === u ? { ...se, tool_name: U } : se)
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
                            onClick: () => W((b) => b.filter((U, X) => X !== u)),
                            children: a("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    u
                  )),
                  /* @__PURE__ */ e.jsx(E, { type: "dashed", onClick: () => W((y) => [...y, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Je,
              {
                image: Je.PRESENTED_IMAGE_SIMPLE,
                description: t("settings.skills.aiToolsetsEmpty", { defaultValue: "No AI toolsets available for this organization." })
              }
            ) }) })
          ] })
        }
      ),
      /* @__PURE__ */ e.jsx(
        me,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: C,
          onOk: P,
          onCancel: () => D(!1),
          confirmLoading: be,
          children: /* @__PURE__ */ e.jsxs(o, { form: g, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(ls, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(kt, {}), children: a("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx($, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: ge.map((y) => ({ value: y, label: y })) }) })
          ] })
        }
      )
    ] })
  ] });
}, ml = () => {
  const { message: l } = pe.useApp(), t = we(), { t: a } = G("system"), { t: s } = G("task"), { t: n } = G("common"), [i] = o.useForm(), { data: r } = A(S.system.listLogStorageBackends), { data: m } = A(S.system.getTaskSettingFields), d = (r ?? []).map((_) => ({
    value: _.id,
    label: a(`settings.task.logStorage.${_.id}`, { defaultValue: _.name })
  })), { loading: c, refresh: f } = A(S.system.getTaskSettings, {
    onSuccess: (_) => {
      _ && i.setFieldsValue(_);
    },
    onError: () => {
      l.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: V, run: x } = A(S.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      l.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: () => {
      l.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), O = (_) => {
    x(_);
  }, I = (_) => {
    switch (_.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          oe,
          {
            style: { width: "100%" },
            addonAfter: _.key.includes("retention_days") ? a("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(oe, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx($, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx($, { options: _.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Ht, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(v, {});
    }
  }, L = (_) => _.value_type === "int" || _.value_type === "number" || _.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(je, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: O,
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
                options: d,
                placeholder: a("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: r === void 0
              }
            )
          }
        ),
        (m ?? []).map((_) => /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: _.key,
            label: a(`settings.task.fields.${_.key}`, { defaultValue: _.key }),
            rules: L(_),
            valuePropName: _.value_type === "bool" ? "checked" : "value",
            children: I(_)
          },
          _.key
        )),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: V, icon: /* @__PURE__ */ e.jsx(We, {}), children: n("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(E, { onClick: () => f(), icon: /* @__PURE__ */ e.jsx(_e, {}), children: n("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Dt, {}), onClick: () => t("/tasks"), children: s("listTitle", { defaultValue: "Task List" }) }),
          /* @__PURE__ */ e.jsx(ce, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(bs, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { Text: pl } = Ge, fl = [
  { value: "anonymous", label: "anonymous" },
  { value: "user", label: "user" },
  { value: "service_account", label: "service_account" }
], ct = { marginBottom: 0 }, gl = ({ onResetSubject: l }) => {
  const { t } = G("system"), { t: a } = G("common"), s = [
    { key: "anonymous", label: t("settings.rateLimit.anonymous", { defaultValue: "Anonymous (IP)" }) },
    { key: "user", label: t("settings.rateLimit.user", { defaultValue: "User" }) },
    { key: "service_account", label: t("settings.rateLimit.serviceAccount", { defaultValue: "Service account" }) }
  ], n = [
    { title: t("settings.rateLimit.subjectType", { defaultValue: "Subject" }), dataIndex: "label", width: 180 },
    {
      title: `${t("settings.rateLimit.rate", { defaultValue: "Rate" })} / ${t("settings.rateLimit.period", { defaultValue: "Period" })}`,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { style: ct, children: /* @__PURE__ */ e.jsxs(H.Compact, { children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "rate"], rules: [{ required: !0 }], noStyle: !0, children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: 88 } }) }),
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "period"], noStyle: !0, children: /* @__PURE__ */ e.jsx(v, { placeholder: "1m", style: { width: 72 } }) })
      ] }) })
    },
    {
      title: t("settings.rateLimit.burst", { defaultValue: "Burst" }),
      width: 120,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "burst"], style: ct, children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: "100%" } }) })
    },
    {
      title: `${t("settings.rateLimit.quota", { defaultValue: "Quota" })} / ${t("settings.rateLimit.quotaPeriod", { defaultValue: "Quota period" })}`,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { style: ct, children: /* @__PURE__ */ e.jsxs(H.Compact, { children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "quota"], noStyle: !0, children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: 100 }, placeholder: "0" }) }),
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "quota_period"], noStyle: !0, children: /* @__PURE__ */ e.jsx(v, { placeholder: "1d", style: { width: 72 } }) })
      ] }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      width: 64,
      render: (i, r) => /* @__PURE__ */ e.jsx(qe, { actions: [
        {
          key: "reset",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(gt, {}),
          htmlType: "button",
          tooltip: t("settings.rateLimit.resetSubject", { defaultValue: "Reset counters" }),
          confirm: { title: t("settings.rateLimit.resetSubjectConfirm", { defaultValue: "Reset shared-bucket counters for this subject type?" }) },
          onClick: async () => {
            await (l == null ? void 0 : l(r.key));
          }
        }
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsx(
    Pe,
    {
      size: "small",
      pagination: !1,
      rowKey: "key",
      columns: n,
      dataSource: s
    }
  );
}, hl = () => {
  const { message: l } = pe.useApp(), { t } = G("system"), { t: a } = G("common"), { hasPermission: s } = jt(), n = s("system:rate_limit:update"), [i] = o.useForm(), [r] = o.useForm(), [m, d] = j(!1), [c, f] = j(null), [V, x] = j({ current: 1, page_size: 10 }), [O, I] = j(""), { data: L, loading: _, refresh: q } = A(S.system.getRateLimitSettings, {
    onSuccess: (M) => i.setFieldsValue(M),
    onError: () => l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }))
  }), { loading: C, run: D } = A(S.system.updateRateLimitSettings, {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), q();
    },
    onError: (M) => l.error(M.message || t("settings.updateFailed", { defaultValue: "Failed to update settings" }))
  }), { data: g, loading: J, refresh: Y } = A(
    () => S.system.listRateLimitRules({ current: V.current, page_size: V.page_size, search: O || void 0 }),
    { refreshDeps: [V.current, V.page_size, O] }
  ), K = () => {
    f(null), r.resetFields(), r.setFieldsValue({ subject_type: "user", period: "1m", enabled: !0, method: "GET", quota: 0 }), d(!0);
  }, ee = (M) => {
    f(M), r.setFieldsValue(M), d(!0);
  }, { run: Q, loading: te } = A(
    async (M) => {
      const W = { ...M, enabled: M.enabled !== !1 };
      return c != null && c.id ? S.system.updateRateLimitRule({ id: c.id }, W) : S.system.createRateLimitRule(W);
    },
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("success", { defaultValue: "Operation successful" })), d(!1), Y();
      },
      onError: (M) => l.error(M.message)
    }
  ), F = async (M) => {
    try {
      await S.system.resetRateLimitCounters(M), l.success(t("settings.rateLimit.resetSuccess", { defaultValue: "Counters reset" }));
    } catch (W) {
      throw l.error(W instanceof Error ? W.message : t("settings.rateLimit.resetFailed", { defaultValue: "Failed to reset counters" })), W;
    }
  }, w = [
    { title: t("settings.rateLimit.subjectType", { defaultValue: "Subject" }), dataIndex: "subject_type", width: 140 },
    { title: t("settings.rateLimit.subjectId", { defaultValue: "Subject ID" }), dataIndex: "subject_id", ellipsis: !0 },
    { title: t("settings.rateLimit.method", { defaultValue: "Method" }), dataIndex: "method", width: 90 },
    { title: t("settings.rateLimit.path", { defaultValue: "Path" }), dataIndex: "path", ellipsis: !0 },
    { title: t("settings.rateLimit.rate", { defaultValue: "Rate" }), dataIndex: "rate", width: 80 },
    { title: t("settings.rateLimit.period", { defaultValue: "Period" }), dataIndex: "period", width: 80 },
    { title: t("settings.rateLimit.burst", { defaultValue: "Burst" }), dataIndex: "burst", width: 80 },
    {
      title: a("actions", { defaultValue: "Actions" }),
      width: 150,
      render: (M, W) => /* @__PURE__ */ e.jsx(qe, { actions: [
        {
          key: "edit",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          tooltip: a("edit", { defaultValue: "Edit" }),
          onClick: async () => {
            ee(W);
          }
        },
        {
          key: "delete",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          danger: !0,
          tooltip: a("delete", { defaultValue: "Delete" }),
          confirm: { title: t("settings.rateLimit.deleteConfirm", { defaultValue: "Delete this rule?" }) },
          onClick: async () => {
            await S.system.deleteRateLimitRule({ id: W.id }), Y();
          }
        },
        {
          key: "reset",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(gt, {}),
          tooltip: t("settings.rateLimit.resetRule", { defaultValue: "Reset counters" }),
          confirm: { title: t("settings.rateLimit.resetRuleConfirm", { defaultValue: "Reset counters for this rule?" }) },
          onClick: async () => {
            await F({
              scope: "rule",
              rule_id: W.id,
              subject_type: W.subject_type,
              subject_id: W.subject_id || ""
            });
          }
        }
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(je, { spinning: _, children: [
    (L == null ? void 0 : L.memory_warn) && /* @__PURE__ */ e.jsx(
      tt,
      {
        type: "warning",
        showIcon: !0,
        style: { marginBottom: 16 },
        message: t("settings.rateLimit.memoryWarn", { defaultValue: "Cluster mode with in-memory store: limits are per node. Use rate_limit.store=redis for cluster-wide limits." })
      }
    ),
    /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", onFinish: D, disabled: !n, children: [
      /* @__PURE__ */ e.jsxs(H, { wrap: !0, align: "center", style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: "enabled", label: t("settings.rateLimit.enabled", { defaultValue: "Enable rate limiting" }), valuePropName: "checked", style: { marginBottom: 0 }, children: /* @__PURE__ */ e.jsx(de, {}) }),
        /* @__PURE__ */ e.jsxs(pl, { type: "secondary", children: [
          t("settings.rateLimit.storeLabel", { defaultValue: "Store" }),
          ": ",
          (L == null ? void 0 : L.store) || "memory",
          " · ",
          t("settings.rateLimit.failOpen", { defaultValue: "Fail open" }),
          ": ",
          String((L == null ? void 0 : L.fail_open) ?? !0)
        ] })
      ] }),
      /* @__PURE__ */ e.jsx(Ke, { children: t("settings.rateLimit.defaults", { defaultValue: "Default shared buckets" }) }),
      /* @__PURE__ */ e.jsx(
        gl,
        {
          onResetSubject: (M) => F({
            scope: "subject",
            subject_type: M,
            subject_id: "",
            rule_id: ""
          })
        }
      ),
      /* @__PURE__ */ e.jsx(ce, { permission: "system:rate_limit:update", children: /* @__PURE__ */ e.jsxs(H, { style: { marginTop: 12 }, children: [
        /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(We, {}), loading: C, children: a("save", { defaultValue: "Save" }) }),
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: () => q(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(
          Ot,
          {
            title: t("settings.rateLimit.resetAllConfirm", { defaultValue: "Reset every rate-limit and quota counter? Currently blocked clients will be allowed immediately." }),
            onConfirm: () => F({
              scope: "global",
              subject_type: "anonymous",
              subject_id: "",
              rule_id: ""
            }),
            children: /* @__PURE__ */ e.jsx(E, { danger: !0, htmlType: "button", icon: /* @__PURE__ */ e.jsx(gt, {}), children: t("settings.rateLimit.resetAll", { defaultValue: "Reset all counters" }) })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(Ke, { children: t("settings.rateLimit.routeRules", { defaultValue: "Route rules" }) }),
    /* @__PURE__ */ e.jsxs(H, { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(
        v.Search,
        {
          allowClear: !0,
          placeholder: a("search", { defaultValue: "Search" }),
          onSearch: (M) => {
            I(M), x((W) => ({ ...W, current: 1 }));
          },
          style: { width: 240 }
        }
      ),
      /* @__PURE__ */ e.jsx(ce, { permission: "system:rate_limit:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: K, children: a("create", { defaultValue: "Create" }) }) }),
      /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: () => Y(), children: a("refresh", { defaultValue: "Refresh" }) })
    ] }),
    /* @__PURE__ */ e.jsx(
      Pe,
      {
        rowKey: "id",
        loading: J,
        columns: w,
        dataSource: (g == null ? void 0 : g.data) || [],
        pagination: {
          current: (g == null ? void 0 : g.current) || V.current,
          pageSize: (g == null ? void 0 : g.page_size) || V.page_size,
          total: (g == null ? void 0 : g.total) || 0,
          onChange: (M, W) => x({ current: M, page_size: W })
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      me,
      {
        open: m,
        title: c ? t("settings.rateLimit.editRule", { defaultValue: "Edit rule" }) : t("settings.rateLimit.createRule", { defaultValue: "Create rule" }),
        onCancel: () => d(!1),
        onOk: () => r.submit(),
        confirmLoading: te,
        destroyOnClose: !0,
        children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", onFinish: Q, disabled: !n, children: [
          /* @__PURE__ */ e.jsx(o.Item, { name: "subject_type", label: t("settings.rateLimit.subjectType", { defaultValue: "Subject" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx($, { options: fl }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "subject_id", label: t("settings.rateLimit.subjectId", { defaultValue: "Subject ID" }), children: /* @__PURE__ */ e.jsx(v, { placeholder: t("settings.rateLimit.subjectIdHint", { defaultValue: "Empty = all subjects of this type" }) }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "method", label: t("settings.rateLimit.method", { defaultValue: "Method" }), children: /* @__PURE__ */ e.jsx(v, { placeholder: "GET" }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "path", label: t("settings.rateLimit.path", { defaultValue: "Path" }), extra: t("settings.rateLimit.pathHint", { defaultValue: "Gin full path, e.g. /api/ai/chat/sessions/:sessionId. Empty = shared bucket." }), children: /* @__PURE__ */ e.jsx(v, {}) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "rate", label: t("settings.rateLimit.rate", { defaultValue: "Rate" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "period", label: t("settings.rateLimit.period", { defaultValue: "Period" }), children: /* @__PURE__ */ e.jsx(v, { placeholder: "1m" }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "burst", label: t("settings.rateLimit.burst", { defaultValue: "Burst" }), children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "quota", label: t("settings.rateLimit.quota", { defaultValue: "Quota" }), children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "quota_period", label: t("settings.rateLimit.quotaPeriod", { defaultValue: "Quota period" }), children: /* @__PURE__ */ e.jsx(v, { placeholder: "1d" }) }),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "enabled",
              label: t("settings.rateLimit.enabled", { defaultValue: "Enabled" }),
              valuePropName: "checked",
              initialValue: !0,
              extra: t("settings.rateLimit.enabledHint", { defaultValue: "Off: this rule is ignored and the next layer applies." }),
              children: /* @__PURE__ */ e.jsx(de, {})
            }
          )
        ] })
      }
    )
  ] });
}, { TextArea: xl } = v, yl = /^[-_a-zA-Z0-9.]+$/, jl = () => {
  const { message: l, modal: t } = pe.useApp(), a = we(), { t: s, i18n: n } = G("system"), { t: i } = G("common"), r = (k) => {
    if (!k) return "-";
    const h = new Date(k);
    return Number.isNaN(h.getTime()) ? "-" : h.toLocaleString(n.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [m] = o.useForm(), [d, c] = j(!1), [f, V] = j(null), [x, O] = j(""), [I, L] = j(1), [_, q] = j(10), { loading: C, data: D, refresh: g } = A(
    () => Ps({ current: I, page_size: _, search: x }),
    {
      refreshDeps: [I, _, x],
      onError: (k) => {
        l.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", k);
      }
    }
  ), { loading: J, run: Y } = A(
    (k) => Ls(k),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), c(!1), m.resetFields(), V(null), g();
      },
      onError: (k) => {
        l.error((k == null ? void 0 : k.err) || s("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: K, run: ee } = A(
    ({ id: k, ...h }) => Os({ id: k }, h),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), c(!1), m.resetFields(), V(null), g();
      },
      onError: (k) => {
        l.error((k == null ? void 0 : k.err) || s("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: Q } = A(
    (k) => Rs({ id: k }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), g();
      },
      onError: (k) => {
        l.error((k == null ? void 0 : k.err) || s("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), te = () => {
    V(null), m.resetFields(), m.setFieldsValue({ status: "active" }), c(!0);
  }, F = (k) => {
    V(k), m.setFieldsValue({
      name: k.name,
      slug: k.slug,
      description: k.description,
      status: k.status
    }), c(!0);
  }, w = (k) => {
    t.confirm({
      title: s("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: s("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${k.name}"? This action cannot be undone.`
      }),
      onOk: () => Q(k.id)
    });
  }, M = () => {
    m.validateFields().then((k) => {
      f ? ee({ id: f.id, ...k }) : Y(k);
    });
  }, W = [
    {
      title: s("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: s("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (k) => k || "-"
    },
    {
      title: s("settings.organizations.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: s("settings.organizations.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (k) => /* @__PURE__ */ e.jsx(ne, { color: k === "active" ? "green" : "default", children: k === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (k) => r(k)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (k, h) => /* @__PURE__ */ e.jsx(
        qe,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Nt, {}),
              onClick: async () => a(`/system/settings/organizations/${h.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              onClick: async () => F(h),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              danger: !0,
              onClick: async () => w(h),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    ie,
    {
      title: s("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(H, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: g, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: te, children: s("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            v.Search,
            {
              placeholder: s("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (k) => {
                O(k), L(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Pe,
            {
              columns: W,
              dataSource: (D == null ? void 0 : D.data) || [],
              loading: C,
              rowKey: "id",
              pagination: {
                current: I,
                pageSize: _,
                total: (D == null ? void 0 : D.total) || 0,
                showSizeChanger: !0,
                showTotal: (k, h) => i("pagination.total", {
                  defaultValue: `${h[0]}-${h[1]} of ${k} items`,
                  start: h[0],
                  end: h[1],
                  total: k
                }),
                onChange: (k, h) => {
                  L(k), q(h);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          me,
          {
            title: f ? s("settings.organizations.edit", { defaultValue: "Edit Organization" }) : s("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: d,
            onOk: M,
            onCancel: () => {
              c(!1), m.resetFields(), V(null);
            },
            confirmLoading: J || K,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(o, { form: m, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "name",
                  label: s("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: s("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(v, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "slug",
                  label: s("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: s("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: yl,
                    message: s("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(v, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "description",
                  label: s("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(xl, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "status",
                  label: s("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs($, { children: [
                    /* @__PURE__ */ e.jsx($.Option, { value: "active", children: s("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx($.Option, { value: "disabled", children: s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, bl = ({
  transformItems: l = (t) => t
}) => {
  const { t } = G("system"), a = we(), s = zs(), r = s.hash.replace("#", "") || "base", { enableMultiOrg: m } = yt(), { hasPermission: d } = jt(), c = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(el, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Qs, {}),
      hidden: !d("system:security:update")
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Gs, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Xs, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Ys, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ai-models",
      label: t("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(ll, {}),
      hidden: !d("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: t("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(ol, {}),
      hidden: !d("system:toolsets:view")
    },
    {
      key: "skills",
      label: t("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(cl, {}),
      hidden: !d("system:skills:view")
    },
    {
      key: "task",
      label: t("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(ml, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "rate-limit",
      label: t("settings.tabs.rateLimit", { defaultValue: "Rate Limit" }),
      children: /* @__PURE__ */ e.jsx(hl, {}),
      hidden: !d("system:rate_limit:view") && !d("system:rate_limit:update")
    },
    // Only show organization tab if multi-org is enabled
    ...m ? [{
      key: "organizations",
      label: t("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(jl, {}),
      hidden: !d("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ie, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Lt,
    {
      defaultActiveKey: r,
      onChange: (f) => {
        a(`${s.pathname}#${f}`);
      },
      items: l(c.filter((f) => !f.hidden), t)
    }
  ) });
}, ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bl
}, Symbol.toStringTag, { value: "Module" })), Vl = () => {
  var Ce, be, Ve;
  const { message: l, modal: t } = pe.useApp(), a = we(), { id: s } = ot(), { t: n } = G("system"), { t: i } = G("common"), [r] = o.useForm(), [m] = o.useForm(), [d, c] = j(!1), [f, V] = j(!1), [x, O] = j(null), [I, L] = j(""), [_, q] = j(1), [C, D] = j(10), { data: g, loading: J, refresh: Y } = A(
    () => Ms({ id: s }),
    {
      ready: !!s,
      onError: (T) => {
        l.error(n("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", T);
      }
    }
  ), { data: K, loading: ee, refresh: Q } = A(
    () => Ns({ id: s, current: _, page_size: C, search: I }),
    {
      ready: !!s,
      refreshDeps: [s, _, C, I],
      onError: (T) => {
        l.error(n("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", T);
      }
    }
  ), { data: te, loading: F } = A(
    () => $s({ current: 1, page_size: 1e3 }),
    {
      ready: d
    }
  ), { data: w, loading: M } = A(
    () => Bs({ organization_id: s, current: 1, page_size: 1e3 }),
    {
      ready: !!s
    }
  ), { loading: W, run: k } = A(
    (T) => Ds({ id: s }, T),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), c(!1), r.resetFields(), Q();
      },
      onError: (T) => {
        l.error((T == null ? void 0 : T.err) || n("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: h, run: R } = A(
    (T) => qs({ id: s, user_id: x.id }, T),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), V(!1), m.resetFields(), O(null), Q();
      },
      onError: (T) => {
        l.error((T == null ? void 0 : T.err) || n("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: N } = A(
    (T) => Us({ id: s, user_id: T }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), Q();
      },
      onError: (T) => {
        l.error((T == null ? void 0 : T.err) || n("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), B = () => {
    c(!0), r.resetFields();
  }, Z = (T) => {
    var ae;
    O(T), m.setFieldsValue({
      role_ids: ((ae = T.organization_roles) == null ? void 0 : ae.map((fe) => fe.id)) || []
    }), V(!0);
  }, ue = (T) => {
    t.confirm({
      title: n("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: n("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${T.full_name || T.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => N(T.id)
    });
  }, ge = () => {
    r.validateFields().then((T) => {
      k(T);
    });
  }, Ae = () => {
    m.validateFields().then((T) => {
      R(T);
    });
  }, Ee = ((Ce = te == null ? void 0 : te.data) == null ? void 0 : Ce.filter((T) => {
    var ae;
    return !((ae = K == null ? void 0 : K.data) != null && ae.some((fe) => fe.id === T.id));
  })) || [], ze = [
    {
      title: n("settings.organizations.users.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    {
      title: n("settings.organizations.users.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: n("settings.organizations.users.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: n("settings.organizations.users.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (T) => /* @__PURE__ */ e.jsx(ne, { color: T === "active" ? "green" : "default", children: T === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : T })
    },
    {
      title: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (T, ae) => {
        var fe;
        return /* @__PURE__ */ e.jsx(H, { wrap: !0, children: ((fe = ae.organization_roles) == null ? void 0 : fe.map((Te) => /* @__PURE__ */ e.jsx(ne, { children: Te.name }, Te.id))) || /* @__PURE__ */ e.jsx(ne, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (T, ae) => /* @__PURE__ */ e.jsx(
        qe,
        {
          actions: [
            {
              key: "edit",
              label: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              onClick: async () => Z(ae)
            },
            {
              key: "delete",
              label: n("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              danger: !0,
              onClick: async () => ue(ae)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      ie,
      {
        title: /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              icon: /* @__PURE__ */ e.jsx(xt, {}),
              onClick: () => a("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            n("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            g == null ? void 0 : g.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: () => {
          Y(), Q();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: J,
        children: /* @__PURE__ */ e.jsxs(re, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.name", { defaultValue: "Name" }), children: g == null ? void 0 : g.name }),
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.slug", { defaultValue: "Slug" }), children: (g == null ? void 0 : g.slug) || "-" }),
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: (g == null ? void 0 : g.status) === "active" ? "green" : "default", children: (g == null ? void 0 : g.status) === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : n("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (g == null ? void 0 : g.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ie,
      {
        title: n("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: B, children: n("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(H, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            v.Search,
            {
              placeholder: n("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (T) => {
                L(T), q(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Pe,
            {
              columns: ze,
              dataSource: (K == null ? void 0 : K.data) || [],
              loading: ee,
              rowKey: "id",
              pagination: {
                current: _,
                pageSize: C,
                total: (K == null ? void 0 : K.total) || 0,
                showSizeChanger: !0,
                showTotal: (T) => i("pagination.total", { defaultValue: `Total ${T} items` }),
                onChange: (T, ae) => {
                  q(T), D(ae);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      me,
      {
        title: n("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: d,
        onOk: ge,
        onCancel: () => {
          c(!1), r.resetFields();
        },
        confirmLoading: W,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "user_id",
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: n("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  showSearch: !0,
                  placeholder: n("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: F,
                  filterOption: (T, ae) => ((ae == null ? void 0 : ae.label) ?? "").toLowerCase().includes(T.toLowerCase()),
                  options: Ee.map((T) => ({
                    label: `${T.full_name || T.username} (${T.email})`,
                    value: T.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "role_ids",
              label: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: M,
                  options: ((be = w == null ? void 0 : w.data) == null ? void 0 : be.map((T) => ({
                    label: T.name,
                    value: T.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      me,
      {
        title: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: f,
        onOk: Ae,
        onCancel: () => {
          V(!1), m.resetFields(), O(null);
        },
        confirmLoading: h,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: m, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                v,
                {
                  value: (x == null ? void 0 : x.full_name) || (x == null ? void 0 : x.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "role_ids",
              label: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                $,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: M,
                  options: ((Ve = w == null ? void 0 : w.data) == null ? void 0 : Ve.map((T) => ({
                    label: T.name,
                    value: T.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vl
}, Symbol.toStringTag, { value: "Module" })), kl = et(() => import("./markdown-viewer.js")), vl = bt(({ css: l }) => ({
  fileTree: l`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `,
  editorSpin: l`
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
})), { TextArea: wt } = v, _l = (l) => l.toLowerCase().endsWith(".md");
function Qt(l) {
  return l.map((t) => {
    var a;
    return {
      key: t.path,
      title: t.name,
      isLeaf: !t.is_dir,
      icon: t.is_dir ? /* @__PURE__ */ e.jsx(qt, {}) : /* @__PURE__ */ e.jsx(Ut, {}),
      children: (a = t.children) != null && a.length ? Qt(t.children) : void 0
    };
  });
}
function mt(l) {
  return l.includes("/") ? l.replace(/\/[^/]+$/, "") : "";
}
const Sl = () => {
  const { message: l, modal: t } = pe.useApp(), { styles: a } = vl(), { id: s } = ot(), n = we(), { t: i } = G("system"), [r, m] = j(null), [d, c] = j(null), [f, V] = j(!1), [x, O] = j(""), [I, L] = j(!1), [_, q] = j([]), [C, D] = j(!1), [g, J] = j(!1), [Y, K] = j(""), [ee] = o.useForm(), [Q, te] = j(null), [F, w] = j(null), [M, W] = j(""), [k] = o.useForm(), { data: h } = A(
    () => s ? S.system.getSkill({ id: s }) : Promise.reject(new Error("No id")),
    { refreshDeps: [s], ready: !!s }
  ), { data: R, loading: N, refresh: B } = A(
    () => s ? S.system.listSkillFilesTree({ id: s }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [s],
      ready: !!s,
      onSuccess: (z) => {
        if (!r) {
          for (const p of z)
            if (!p.is_dir && p.name === "SKILL.md") {
              c(p.path), m(p.path), V(!1);
              return;
            }
          for (const p of z)
            if (!p.is_dir && p.name === "SKILLS.md") {
              c(p.path), m(p.path), V(!1);
              return;
            }
        }
      }
    }
  ), Z = !!(h != null && h.is_preset), ue = ye(() => Qt(R || []), [R]), ge = f && d ? d : r ? mt(r) : "", { loading: Ae } = A(() => !s || !r ? Promise.reject(new Error("No id or selected file")) : S.system.getSkillFile({ id: s, path: r || "" }), {
    refreshDeps: [s, r],
    ready: !!s && !!r,
    onSuccess: (z) => {
      O(z.data);
    },
    onBefore: () => {
      O("");
    },
    onError: () => l.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), Ee = () => {
    !s || !r || Z || S.system.putSkillFile({ id: s, path: r }, x).then(() => {
      l.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), L(!1);
    }).catch(() => l.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, ze = (z, p) => {
    const P = String(p.node.key), le = !p.node.isLeaf;
    c(P), V(le), p.node.isLeaf ? m(P) : m(null);
  }, Ce = (z) => {
    z.event.preventDefault(), te({
      path: String(z.node.key),
      isDir: !z.node.isLeaf,
      x: z.event.clientX,
      y: z.event.clientY
    });
  }, be = xe(() => te(null), []), Ve = xe(
    (z) => {
      if (!s || !Q || Z) return;
      const { path: p, isDir: P } = Q;
      switch (be(), z) {
        case "open":
          m(p), c(p), V(!1);
          break;
        case "rename": {
          const le = p.includes("/") ? p.split("/").pop() : p;
          w({ path: p, isDir: P }), W(le), setTimeout(() => k.setFieldsValue({ name: le }), 0);
          break;
        }
        case "delete":
          t.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: P ? i("settings.skills.editor.deleteConfirmContentDir", { path: p, defaultValue: `Delete ${p}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: p, defaultValue: `Delete ${p}?` }),
            onOk: () => S.system.deleteSkillPath({ id: s, path: p }).then(() => {
              l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === p && (m(null), O("")), d === p && (c(null), V(!1)), B();
            }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          c(p), V(P), D(!0);
          break;
        case "newDir":
          c(p), V(P), J(!0);
          break;
      }
    },
    [s, Q, be, B, r, d, k, i, Z]
  ), T = () => {
    if (!s || !F || Z) return;
    const z = (k.getFieldValue("name") ?? M).trim();
    if (!z) {
      l.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!F.isDir && !/\.(md|txt)$/i.test(z)) {
      l.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const p = mt(F.path), P = p ? `${p}/${z}` : z;
    if (P === F.path) {
      w(null);
      return;
    }
    S.system.moveSkillPath({ id: s }, { from_path: F.path, to_path: P }).then(() => {
      l.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), r === F.path && m(P), d === F.path && c(P), w(null), B();
    }).catch(() => l.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, ae = (z) => {
    if (!s || Z) return;
    const p = String(z.dragNode.key), P = String(z.dragNode.title);
    let le;
    if (z.dropToGap) {
      const Se = mt(String(z.node.key));
      le = Se ? `${Se}/${P}` : P;
    } else
      le = `${z.node.key}/${P}`;
    le !== p && S.system.moveSkillPath({ id: s }, { from_path: p, to_path: le }).then(() => {
      l.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), r === p && m(le), d === p && c(le), B();
    }).catch(() => l.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, fe = () => {
    const z = Y.trim();
    if (!z || !s || Z) return;
    const p = ge ? `${ge}/${z}` : z;
    if (!/\.(md|txt)$/i.test(z)) {
      l.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    S.system.putSkillFile({ id: s, path: p }, "").then(() => {
      l.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), D(!1), K(""), B(), m(p), O("");
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, Te = () => {
    var P;
    const z = (P = ee.getFieldValue("name")) == null ? void 0 : P.trim();
    if (!z || !s || Z) return;
    const p = ge ? `${ge}/${z}` : z;
    S.system.createSkillDir({ id: s }, { path: p }).then(() => {
      l.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), J(!1), ee.resetFields(), B();
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, Re = () => {
    const z = d || r;
    !s || !z || Z || t.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: z, defaultValue: `Delete ${z}?` }),
      onOk: () => S.system.deleteSkillPath({ id: s, path: z }).then(() => {
        l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === z && (m(null), O("")), d === z && (c(null), V(!1)), B();
      }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return s ? /* @__PURE__ */ e.jsxs(
    ie,
    {
      title: (h == null ? void 0 : h.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => n("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        Z ? /* @__PURE__ */ e.jsx(
          tt,
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
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(De, {}), disabled: Z, onClick: () => D(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(qt, {}), disabled: Z, onClick: () => J(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            N ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              as,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !Z,
                expandedKeys: _,
                onExpand: (z) => q(z),
                selectedKeys: d ? [d] : [],
                onSelect: ze,
                onRightClick: Z ? void 0 : Ce,
                onDrop: ae,
                className: a.fileTree,
                treeData: ue
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            r && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(H, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: r }),
                /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(We, {}), disabled: Z || !I, onClick: Ee, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(E, { danger: !0, icon: /* @__PURE__ */ e.jsx(Oe, {}), disabled: Z, onClick: Re, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(je, { spinning: Ae, wrapperClassName: Js(a.editorSpin, "ez-editor-spin"), children: _l(r) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  wt,
                  {
                    value: x,
                    readOnly: Z,
                    onChange: (z) => {
                      O(z.target.value), L(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Ye, { fallback: /* @__PURE__ */ e.jsx(He, {}), children: /* @__PURE__ */ e.jsx(kl, { content: Wt(x) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                wt,
                {
                  value: x,
                  readOnly: Z,
                  onChange: (z) => {
                    O(z.target.value), L(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              ) })
            ] }),
            !r && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        Q && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: be,
              onContextMenu: (z) => z.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: Q.x, top: Q.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            is,
            {
              selectable: !1,
              items: [
                ...Q.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Ut, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Ne, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Oe, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(Vs, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(ks, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: z }) => Ve(z)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(me, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: C, onOk: fe, onCancel: () => {
          D(!1), K("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(v, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: Y, onChange: (z) => K(z.target.value) }) }),
        /* @__PURE__ */ e.jsx(me, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: g, onOk: () => ee.validateFields().then(Te), onCancel: () => J(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(o, { form: ee, layout: "vertical", children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(v, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          me,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!F,
            onOk: T,
            onCancel: () => w(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(o, { form: k, layout: "vertical", onValuesChange: (z, p) => W(p.name ?? ""), children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: F != null && F.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              v,
              {
                placeholder: F != null && F.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => T()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sl
}, Symbol.toStringTag, { value: "Module" })), wl = et(() => import("./markdown-viewer.js")), Cl = () => {
  const { message: l } = pe.useApp(), { id: t } = ot(), a = we(), { t: s } = G("system"), { data: n, loading: i } = A(
    () => t ? S.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: r, loading: m, mutate: d } = A(
    () => t ? S.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => l.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => d()
    }
  ), c = ye(() => r == null ? void 0 : r.map((V) => ({
    key: V.file_name,
    label: V.file_name,
    children: /* @__PURE__ */ e.jsx(Ye, { fallback: /* @__PURE__ */ e.jsx(He, {}), children: /* @__PURE__ */ e.jsx(wl, { content: Wt(V.content) }) })
  })), [r]);
  if (!t) return null;
  const f = i || m;
  return /* @__PURE__ */ e.jsx(je, { spinning: f, children: /* @__PURE__ */ e.jsx(
    ie,
    {
      title: (n == null ? void 0 : n.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => a("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: c
    }
  ) });
}, fa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cl
}, Symbol.toStringTag, { value: "Module" })), { Text: he, Title: Tl } = Ge, ht = ["agent", "llm", "tool"], Ct = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(Fs, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Ts, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Cs, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(ft, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(st, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(ws, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(st, {}) }
}, Tt = {
  agent: "#1677ff",
  llm: "#52c41a",
  tool: "#fa8c16"
}, Fl = {
  llm_request: "#1677ff",
  llm_response: "#52c41a",
  tool_call: "#fa8c16",
  tool_result: "#13c2c2",
  token_usage: "#722ed1",
  error: "#ff4d4f",
  summary: "#2f54eb"
}, Zt = bt(({ css: l }) => ({
  rawToggleWrap: l`
  position: relative;
  .json-block-mode-toggle{
    right: 90px !important;
  }
`,
  rawToggleHeader: l`
    position: absolute;
    top: 6px;
    right: 20px;
    z-index: 2;
  `
})), Il = bt(({ token: l, css: t }) => ({
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
    border: 2px solid ${l.colorBorder};
    border-radius: ${l.borderRadius}px;
    background: ${l.colorBgContainer};
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
      border-left: 2px dashed ${l.colorBorderSecondary};
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
    border-radius: ${l.borderRadius}px;
    transition: background 0.15s;

    &:hover {
      background: ${l.colorFillTertiary};
    }
  `,
  messageRowActive: t`
    background: ${l.colorPrimaryBg} !important;
    outline: 1px solid ${l.colorPrimaryBorder};
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
    background: ${l.colorBgElevated};
    border: 1px solid ${l.colorBorderSecondary};
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  `,
  arrowLabelFailed: t`
    background: ${l.colorErrorBg};
    border-color: ${l.colorErrorBorder};
    color: ${l.colorError} !important;
    font-weight: 600;
  `,
  noteBox: t`
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 70%;
    padding: 6px 12px;
    border-radius: ${l.borderRadius}px;
    border: 1px dashed ${l.colorBorder};
    background: ${l.colorFillQuaternary};
    font-size: 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  `,
  noteBoxFailed: t`
    background: ${l.colorErrorBg};
    border-style: solid;
    border-color: ${l.colorErrorBorder};
    color: ${l.colorError};
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
    color: ${l.colorTextSecondary};
    z-index: 2;
  `
}));
function Xt(l) {
  const { parsed: t, isJSON: a } = Ze(l);
  return a && typeof t == "object" && t !== null ? { text: l, value: t } : { text: l };
}
function Ft(l) {
  if (typeof l == "string") return { text: l };
  const t = JSON.stringify(l, null, 2);
  return typeof l == "object" && l !== null ? { text: t, value: l } : { text: t };
}
function Al(l) {
  const t = l.map((s) => {
    const { parsed: n, isJSON: i } = Ze(s.content);
    return {
      event: s,
      isJSON: i,
      parsed: n,
      display: {
        text: s.content,
        value: i && typeof n == "object" && n !== null ? n : void 0
      }
    };
  });
  let a = null;
  for (const s of t) {
    const n = s.event.event_type;
    if (n === "llm_request") {
      a = s;
      continue;
    }
    if (n !== "llm_response") continue;
    const i = s.display.value;
    if (i && ("raw_request" in i || "raw_response" in i)) {
      const { raw_request: r, raw_response: m, ...d } = i;
      s.display = { text: JSON.stringify(d, null, 2), value: d }, r !== void 0 && a && (a.rawRequest = Ft(r)), m !== void 0 && (s.rawResponse = Ft(m));
    }
    a = null;
  }
  return t;
}
const Xe = ({ children: l, fallback: t }) => {
  const [a, s] = j(!1);
  return Le(() => {
    let n = 0;
    const i = window.requestAnimationFrame(() => {
      n = window.requestAnimationFrame(() => s(!0));
    });
    return () => {
      window.cancelAnimationFrame(i), window.cancelAnimationFrame(n);
    };
  }, []), a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t ?? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "16px 0" }, children: /* @__PURE__ */ e.jsx(je, { size: "small" }) }) });
}, ve = ({
  payload: l,
  maxHeight: t
}) => {
  const [a, s] = j("raw"), n = /* @__PURE__ */ e.jsx(
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
      children: l.text
    }
  );
  return l.value ? /* @__PURE__ */ e.jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ e.jsx("div", { className: "json-block-mode-toggle", style: { position: "absolute", top: 6, right: 6, zIndex: 2 }, children: /* @__PURE__ */ e.jsx(
      nt,
      {
        size: "small",
        value: a,
        onChange: (i) => s(i),
        options: [
          { value: "raw", icon: /* @__PURE__ */ e.jsx(Bt, {}), title: "Raw" },
          { value: "json", icon: /* @__PURE__ */ e.jsx(Jt, {}), title: "JSON" }
        ]
      }
    ) }),
    a === "json" ? /* @__PURE__ */ e.jsx(Xe, { children: /* @__PURE__ */ e.jsx(
      lt,
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
        value: l.value
      }
    ) }) : n
  ] }) : n;
}, pt = "#ff4d4f";
function Yt(l, t) {
  if (!t || !l) return !1;
  if (typeof l.ok == "boolean") return !l.ok;
  const a = (l.result || "").trim();
  return a ? !!(a === "tool call failed" || /^unknown tool:/i.test(a) || /^tool .+ failed:/i.test(a)) : !1;
}
const El = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  if (!l.isJSON)
    return /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a });
  const s = l.parsed;
  return /* @__PURE__ */ e.jsxs(re, { size: "small", column: 2, bordered: !0, style: { maxHeight: a, overflow: "auto" }, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: t("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: t("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: t("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: t("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] });
}, zl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = ye(
    () => s != null && s.arguments ? Xt(s.arguments) : null,
    [s]
  );
  return s ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(he, { code: !0, children: s.tool_call_id })
    ] }),
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: "blue", children: s.tool })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ve, { payload: n, maxHeight: a })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a });
}, Pl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = ye(
    () => s != null && s.result ? Xt(s.result) : null,
    [s]
  );
  if (!s)
    return /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a });
  const i = Yt(s, !0);
  return /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(he, { code: !0, children: s.tool_call_id })
    ] }),
    (typeof s.ok == "boolean" || i) && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.status", { defaultValue: "Status" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: i ? "error" : "success", children: i ? t("trace.failed", { defaultValue: "Failed" }) : t("trace.succeeded", { defaultValue: "Succeeded" }) })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { style: { overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ve, { payload: n, maxHeight: a })
    ] })
  ] });
}, at = { verticalAlign: "-2px" }, Ll = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = j("request"), { styles: i } = Zt({ isRaw: s === "raw" });
  return l.rawRequest ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      nt,
      {
        size: "small",
        value: s,
        onChange: (r) => n(r),
        options: [
          {
            value: "request",
            icon: /* @__PURE__ */ e.jsx(zt, { style: at }),
            title: t("trace.request", { defaultValue: "Request" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx(Pt, { style: at }),
            title: t("trace.rawRequest", { defaultValue: "Raw Request" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Xe, { children: /* @__PURE__ */ e.jsx(ve, { payload: l.rawRequest, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a });
}, Ol = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = j("response"), { styles: i } = Zt({ isRaw: s === "raw" });
  return l.rawResponse ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      nt,
      {
        size: "small",
        value: s,
        onChange: (r) => n(r),
        options: [
          {
            value: "response",
            icon: /* @__PURE__ */ e.jsx(zt, { style: at }),
            title: t("trace.response", { defaultValue: "Response" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx(Pt, { style: at }),
            title: t("trace.rawResponse", { defaultValue: "Raw Response" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Xe, { children: /* @__PURE__ */ e.jsx(ve, { payload: l.rawResponse, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a });
}, It = ({ entry: l, t, maxHeight: a }) => {
  const { event: s } = l;
  switch (s.event_type) {
    case "llm_request":
      return /* @__PURE__ */ e.jsx(Ll, { entry: l, t, maxHeight: a });
    case "llm_response":
      return /* @__PURE__ */ e.jsx(Ol, { entry: l, t, maxHeight: a });
    case "token_usage":
      return /* @__PURE__ */ e.jsx(El, { entry: l, t, maxHeight: a });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(zl, { entry: l, t, maxHeight: a });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Pl, { entry: l, t, maxHeight: a });
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
      return /* @__PURE__ */ e.jsx(ve, { payload: l.display, maxHeight: a });
  }
};
function At(l) {
  return ht.indexOf(l);
}
function Et(l, t) {
  return l > 0 ? ` (${t("trace.durationMs", {
    ms: l,
    defaultValue: `${l}ms`
  })})` : "";
}
function Rl(l, t) {
  const a = /* @__PURE__ */ new Map();
  for (const n of l) {
    if (n.event.event_type !== "tool_call" || !n.isJSON) continue;
    const i = n.parsed;
    i.tool_call_id && i.tool && a.set(i.tool_call_id, i.tool);
  }
  const s = t("trace.failed", { defaultValue: "Failed" });
  return l.map((n, i) => {
    const { event: r } = n, m = t(`trace.eventTypes.${r.event_type}`, {
      defaultValue: r.event_type
    }), d = Fl[r.event_type] || "#8c8c8c";
    switch (r.event_type) {
      case "llm_request":
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: m,
          kind: "call",
          color: d
        };
      case "llm_response":
        return {
          id: r.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: `${m}${Et(r.duration_ms, t)}`,
          kind: "return",
          color: d
        };
      case "tool_call": {
        const c = n.isJSON ? n.parsed : null, f = (c == null ? void 0 : c.tool) || m;
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "tool",
          label: f,
          kind: "call",
          color: d
        };
      }
      case "tool_result": {
        const c = n.isJSON ? n.parsed : null, f = Yt(c, n.isJSON), V = (c == null ? void 0 : c.tool_call_id) && a.get(c.tool_call_id) || "", x = V ? `${m}: ${V}` : m;
        return {
          id: r.id,
          entry: n,
          from: "tool",
          to: "agent",
          label: f ? `${x} · ${s}` : x,
          kind: "return",
          color: f ? pt : d,
          failed: f
        };
      }
      case "summary":
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: m,
          kind: "call",
          color: d
        };
      case "token_usage": {
        const c = n.isJSON ? n.parsed : null, f = (c == null ? void 0 : c.total_tokens) != null ? ` · ${c.total_tokens}` : "";
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: `${m}${f}`,
          kind: "note",
          color: d
        };
      }
      case "error": {
        const c = i > 0 ? l[i - 1].event : void 0, f = (c == null ? void 0 : c.event_type) === "llm_request", V = `${m}${Et(r.duration_ms, t)} · ${s}`;
        return f ? {
          id: r.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: V,
          kind: "return",
          color: pt,
          failed: !0
        } : {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: V,
          kind: "note",
          color: pt,
          failed: !0
        };
      }
      default:
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: m,
          kind: "note",
          color: d
        };
    }
  });
}
const Ml = ({ from: l, to: t, label: a, color: s, kind: n, failed: i, styles: r, cx: m }) => {
  const d = At(l), c = At(t), f = (Math.min(d, c) + 0.5) * (100 / 3), V = (Math.max(d, c) + 0.5) * (100 / 3), x = V - f, O = c > d, I = n === "return";
  return /* @__PURE__ */ e.jsxs("div", { className: r.arrowTrack, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowLine,
        style: {
          left: `${f}%`,
          width: `${x}%`,
          borderTopColor: s,
          borderTopStyle: I ? "dashed" : "solid"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowHead,
        style: O ? {
          left: `calc(${V}% - 2px)`,
          borderLeft: `8px solid ${s}`
        } : {
          left: `calc(${f}% - 6px)`,
          borderRight: `8px solid ${s}`
        }
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: m(r.arrowLabel, i && r.arrowLabelFailed),
        style: { color: s, borderColor: s },
        title: a,
        children: [
          i && /* @__PURE__ */ e.jsx($t, { className: r.failIcon }),
          /* @__PURE__ */ e.jsx("span", { children: a })
        ]
      }
    )
  ] });
}, Nl = ({ entries: l, t, selectedId: a, onSelect: s }) => {
  const { styles: n, cx: i } = Il(), r = ye(
    () => Rl(l, t),
    [l, t]
  ), m = (d) => t(`trace.actors.${d}`, {
    defaultValue: d === "agent" ? "Agent" : d === "llm" ? "LLM" : "Tool"
  });
  return r.length === 0 ? /* @__PURE__ */ e.jsx(
    Je,
    {
      description: t("trace.noEvents", {
        defaultValue: "No trace events found for this trace ID"
      })
    }
  ) : /* @__PURE__ */ e.jsx("div", { className: n.sequenceWrap, children: /* @__PURE__ */ e.jsxs("div", { className: n.sequenceInner, children: [
    /* @__PURE__ */ e.jsx("div", { className: n.actorHeader, children: ht.map((d) => /* @__PURE__ */ e.jsx(
      "div",
      {
        className: n.actorBox,
        style: { borderColor: Tt[d], color: Tt[d] },
        children: m(d)
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: n.messageList, children: [
      /* @__PURE__ */ e.jsx("div", { className: n.lifelineBg, children: ht.map((d) => /* @__PURE__ */ e.jsx("div", { className: n.lifeline }, d)) }),
      r.map((d) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          role: "button",
          tabIndex: 0,
          className: i(
            n.messageRow,
            a === d.id && n.messageRowActive
          ),
          onClick: () => s(d.entry),
          onKeyDown: (c) => {
            (c.key === "Enter" || c.key === " ") && (c.preventDefault(), s(d.entry));
          },
          children: [
            /* @__PURE__ */ e.jsxs("span", { className: n.stepMeta, children: [
              "#",
              d.entry.event.step_order
            ] }),
            d.kind === "note" ? /* @__PURE__ */ e.jsxs(
              "div",
              {
                className: i(
                  n.noteBox,
                  d.failed && n.noteBoxFailed
                ),
                style: { borderColor: d.color, color: d.color },
                title: d.label,
                children: [
                  d.failed && /* @__PURE__ */ e.jsx($t, { className: n.failIcon }),
                  /* @__PURE__ */ e.jsx("span", { children: d.label })
                ]
              }
            ) : /* @__PURE__ */ e.jsx(
              Ml,
              {
                from: d.from,
                to: d.to,
                label: d.label,
                color: d.color,
                kind: d.kind,
                failed: d.failed,
                styles: n,
                cx: i
              }
            )
          ]
        },
        d.id
      ))
    ] })
  ] }) });
}, Dl = () => {
  const { message: l, modal: t } = pe.useApp(), { t: a } = G("ai"), s = we(), [n, i] = Kt(), [r, m] = j(""), [d, c] = j(""), [f, V] = j("sequence"), [x, O] = j(
    null
  ), {
    data: I,
    loading: L,
    refresh: _
  } = A(() => S.ai.getAiTraceStatus(), {
    onError: () => {
      l.error(
        a("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), q = (I == null ? void 0 : I.enabled) ?? !1, { loading: C, run: D } = A(
    (h) => S.ai.toggleAiTrace({ enabled: h }),
    {
      manual: !0,
      onSuccess: (h, [R]) => {
        l.success(
          R ? a("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : a("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), _(), R || c("");
      },
      onError: () => {
        l.error(
          a("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: g,
    loading: J,
    run: Y
  } = A(
    (h) => S.ai.getAiTraceEvents({ trace_id: h }),
    {
      manual: !0,
      onError: () => {
        l.error(
          a("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), K = xe(
    (h) => {
      c(h), O(null), Y(h);
    },
    [Y]
  ), ee = us(!1);
  Le(() => {
    var N, B;
    if (ee.current) return;
    ee.current = !0;
    const h = (N = n.get("trace_id")) == null ? void 0 : N.trim();
    h && (m(h), K(h));
    const R = (B = n.get("view")) == null ? void 0 : B.trim();
    R && V(R);
  }, [n, K, V]);
  const Q = xe(() => {
    const h = r.trim();
    h && (i(
      (R) => {
        const N = new URLSearchParams(R);
        return N.set("trace_id", h), N;
      },
      { replace: !0 }
    ), K(h));
  }, [r, K, i]), te = xe(
    (h) => {
      const R = h ? a("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : a("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      t.confirm({
        title: h ? a("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : a("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: R,
        onOk: () => D(h)
      });
    },
    [a, D, t]
  ), F = xe(async () => {
    if (d)
      try {
        const h = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!h.ok) throw new Error("download failed");
        const R = await h.blob(), N = window.URL.createObjectURL(R), B = document.createElement("a");
        B.href = N, B.download = `ai-trace-${d}.json`, document.body.appendChild(B), B.click(), window.URL.revokeObjectURL(N), document.body.removeChild(B);
      } catch {
        l.error(
          a("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, a]), w = ye(() => g ?? [], [g]), M = ye(() => Al(w), [w]);
  Le(() => {
    O(null);
  }, [d, f]);
  const W = ye(
    () => M.map((h) => {
      const { event: R } = h, N = Ct[R.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(st, {})
      }, B = a(`trace.eventTypes.${R.event_type}`, {
        defaultValue: R.event_type
      });
      return {
        key: R.id,
        dot: N.icon,
        color: N.color,
        children: /* @__PURE__ */ e.jsx(
          ns,
          {
            size: "small",
            defaultActiveKey: [R.id],
            items: [
              {
                key: R.id,
                label: /* @__PURE__ */ e.jsxs(H, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ne, { color: N.color, children: B }),
                  /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    R.step_order
                  ] }),
                  R.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    a("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    R.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(he, { type: "secondary", style: { fontSize: 12 }, children: new Date(R.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Xe, { children: /* @__PURE__ */ e.jsx(It, { entry: h, t: a, maxHeight: 400 }) })
              }
            ]
          }
        )
      };
    }),
    [M, a]
  ), k = x ? Ct[x.event.event_type] : null;
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
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
              E,
              {
                icon: /* @__PURE__ */ e.jsx(xt, {}),
                onClick: () => s("/system/settings#ai-models"),
                children: a("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Tl, { level: 4, style: { margin: 0 }, children: a("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(H, { children: [
            /* @__PURE__ */ e.jsx(he, { children: q ? a("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : a("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: q,
                loading: L || C,
                onChange: te
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(H.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        v,
        {
          placeholder: a("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: r,
          onChange: (h) => m(h.target.value),
          onPressEnter: Q,
          prefix: /* @__PURE__ */ e.jsx(vs, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(E, { type: "primary", onClick: Q, loading: J, children: a("trace.search", { defaultValue: "Search" }) }),
      d && w.length > 0 && /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(_s, {}), onClick: F, children: a("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    J ? /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(je, { size: "large" }) }) }) : d && w.length === 0 ? /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(
      Je,
      {
        description: a("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : w.length > 0 ? /* @__PURE__ */ e.jsx(
      ie,
      {
        title: /* @__PURE__ */ e.jsx(
          nt,
          {
            value: f,
            onChange: (h) => {
              V(h), i(
                (R) => {
                  const N = new URLSearchParams(R);
                  return N.set("view", h), N;
                },
                { replace: !0 }
              );
            },
            options: [
              {
                label: a("trace.viewSequence", {
                  defaultValue: "Sequence"
                }),
                value: "sequence",
                icon: /* @__PURE__ */ e.jsx(Ss, {})
              },
              {
                label: a("trace.viewTimeline", {
                  defaultValue: "Timeline"
                }),
                value: "timeline",
                icon: /* @__PURE__ */ e.jsx(Dt, {})
              }
            ]
          }
        ),
        children: f === "sequence" ? /* @__PURE__ */ e.jsx(
          Nl,
          {
            entries: M,
            t: a,
            selectedId: x == null ? void 0 : x.event.id,
            onSelect: O
          }
        ) : /* @__PURE__ */ e.jsx(os, { items: W })
      }
    ) : null,
    /* @__PURE__ */ e.jsx(
      rs,
      {
        title: x ? /* @__PURE__ */ e.jsxs(H, { children: [
          /* @__PURE__ */ e.jsx(ne, { color: (k == null ? void 0 : k.color) || "default", children: a(`trace.eventTypes.${x.event.event_type}`, {
            defaultValue: x.event.event_type
          }) }),
          /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            "#",
            x.event.step_order
          ] }),
          x.event.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            a("trace.duration", { defaultValue: "Duration" }),
            ":",
            " ",
            x.event.duration_ms,
            "ms"
          ] })
        ] }) : null,
        open: f === "sequence" && !!x,
        onClose: () => O(null),
        width: 800,
        styles: { body: { paddingRight: 0 } },
        children: x && /* @__PURE__ */ e.jsx(Xe, { children: /* @__PURE__ */ e.jsx(It, { entry: x, t: a }) }, x.event.id)
      }
    )
  ] });
}, ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dl
}, Symbol.toStringTag, { value: "Module" })), ql = et(() => import("./components.js").then((l) => l.r)), { Text: $e, Title: Ul } = Ge, $l = ({
  content: l,
  maxHeight: t = 400
}) => {
  const { parsed: a, isJSON: s } = Ze(l);
  return s ? /* @__PURE__ */ e.jsx(
    lt,
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
      children: l
    }
  );
}, Bl = () => {
  var k;
  const { message: l } = pe.useApp(), { t } = G("system"), { t: a } = G("common"), s = we(), { id: n } = ot(), [i, r] = j(void 0), [m, d] = j("schema"), [c, f] = j({}), [V, x] = j("{}"), [O, I] = j(null), [L, _] = j(null), { loading: q, data: C } = A(
    () => S.system.getToolSet({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: D, data: g } = A(
    () => S.system.getToolSetTools({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), J = g == null ? void 0 : g.find(
    (h) => {
      var R;
      return ((R = h.function) == null ? void 0 : R.name) === i;
    }
  ), { loading: Y, run: K } = A(
    (h, R) => S.system.callTool({ id: n }, { name: h, parameters: R }),
    {
      manual: !0,
      onSuccess: (h) => {
        I((h == null ? void 0 : h.result) ?? "");
      },
      onError: (h) => {
        var N, B;
        const R = ((B = (N = h.response) == null ? void 0 : N.data) == null ? void 0 : B.message) || h.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        l.error(R), I(null);
      }
    }
  ), ee = xe((h) => {
    r(h), f({}), x("{}"), I(null), _(null);
  }, []), Q = xe(() => {
    if (m === "schema")
      x(JSON.stringify(c, null, 2)), d("code");
    else {
      const { parsed: h, isJSON: R } = Ze(V);
      R && (f(h), _(null)), d("schema");
    }
  }, [m, c, V]), te = xe((h) => {
    x(h);
    const { parsed: R, isJSON: N } = Ze(h);
    N ? (f(R), _(null)) : _(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), F = xe(() => {
    if (!i) {
      l.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let h;
    if (m === "code") {
      if (L) {
        l.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      h = V;
    } else
      h = JSON.stringify(c);
    I(null), K(i, h);
  }, [i, m, c, V, L, K, t]), w = C, M = (w == null ? void 0 : w.status) === "enabled" ? "green" : "red", W = (w == null ? void 0 : w.status) === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(H, { children: [
      /* @__PURE__ */ e.jsx(
        E,
        {
          icon: /* @__PURE__ */ e.jsx(xt, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(Ul, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, loading: q, children: w && /* @__PURE__ */ e.jsxs(re, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx($e, { strong: !0, children: w.name }) }),
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(ne, { color: "blue", children: String(w.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: w.description || "-" }),
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: M, children: W }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ie, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx($e, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        D ? /* @__PURE__ */ e.jsx(je, { size: "small" }) : /* @__PURE__ */ e.jsx(
          $,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: i,
            onChange: ee,
            optionLabelProp: "label",
            children: (g ?? []).map((h) => {
              var Z, ue;
              const R = ((Z = h.function) == null ? void 0 : Z.name) ?? "", N = ((ue = h.function) == null ? void 0 : ue.description) ?? "", B = N ? `${R} - ${N}` : R;
              return /* @__PURE__ */ e.jsx($.Option, { value: R, label: B, children: /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: B,
                  children: B
                }
              ) }, R);
            })
          }
        )
      ] }),
      J && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx($e, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            it,
            {
              title: m === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  size: "small",
                  icon: m === "schema" ? /* @__PURE__ */ e.jsx(Jt, {}) : /* @__PURE__ */ e.jsx(Bt, {}),
                  onClick: Q
                }
              )
            }
          )
        ] }),
        m === "schema" ? (k = J.function) != null && k.parameters ? /* @__PURE__ */ e.jsx(Ye, { fallback: /* @__PURE__ */ e.jsx(He, {}), children: /* @__PURE__ */ e.jsx(
          ql,
          {
            schema: J.function.parameters,
            value: c,
            onChange: f
          }
        ) }) : /* @__PURE__ */ e.jsx($e, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            Ws,
            {
              value: V,
              height: "200px",
              extensions: [Hs()],
              onChange: te,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          L && /* @__PURE__ */ e.jsx($e, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: L })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: O !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        E,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Is, {}),
          loading: Y,
          disabled: !i,
          onClick: F,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      O !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx($e, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx($l, { content: O, maxHeight: 300 })
      ] })
    ] })
  ] });
}, ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bl
}, Symbol.toStringTag, { value: "Module" })), Jl = () => {
  const { t: l } = G("system"), [t] = Kt(), a = t.get("provider"), s = t.get("code"), n = t.get("state"), [i, r] = j(null), [m, d] = j(null), [c, f] = j(null);
  return A(async () => {
    if (!s || !n || !a)
      throw new Error(l("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const V = await S.system.testOauthCallback({ code: s, state: n, provider: a });
    if (!V.user_info)
      throw new Error(l("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!V.user)
      throw new Error(l("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    r(V.user), d(V.user_info);
  }, {
    onSuccess: () => {
      f({
        status: "success",
        message: l("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (V) => {
      f({
        status: "error",
        message: l("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: V.message
      });
    }
  }), c ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    ds,
    {
      status: c.status,
      title: c.message,
      subTitle: c.error,
      extra: /* @__PURE__ */ e.jsxs(H, { style: { display: !m || !i ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ie, { title: l("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(lt, { value: m || {} }) }),
        /* @__PURE__ */ e.jsx(ie, { title: l("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(lt, { value: i || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(He, {});
}, xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jl
}, Symbol.toStringTag, { value: "Module" }));
export {
  ga as A,
  ma as O,
  pa as S,
  ha as T,
  fa as a,
  xa as b,
  ca as i
};
