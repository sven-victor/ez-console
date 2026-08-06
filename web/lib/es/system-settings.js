import { j as e } from "./vendor.js";
import { App as ce, Form as o, Spin as je, Switch as de, Select as U, Input as S, Alert as lt, Divider as nt, Space as W, Button as E, InputNumber as me, Modal as fe, Skeleton as Nt, Descriptions as oe, Steps as Rt, Tag as ne, Table as Le, Radio as qe, Tabs as jt, Popconfirm as Dt, Tooltip as Qe, Card as ae, Row as Be, Col as _e, Checkbox as et, Empty as Pe, AutoComplete as dt, Upload as Ut, Tree as $t, Menu as qt, Collapse as Bt, Typography as Vt, Timeline as Jt, Segmented as Ht, Drawer as Wt, Result as Kt } from "antd";
import { useTranslation as X } from "react-i18next";
import { useState as b, useEffect as Ne, useMemo as ve, Suspense as Je, lazy as He, useCallback as ye } from "react";
import { useRequest as F } from "ahooks";
import { SaveOutlined as We, ReloadOutlined as we, LoadingOutlined as Gt, CheckCircleTwoTone as Zt, ClearOutlined as Xt, StarFilled as Qt, CheckCircleOutlined as Yt, StarOutlined as es, EditOutlined as Re, CopyOutlined as kt, DeleteOutlined as Ee, BugOutlined as St, PlusOutlined as De, ThunderboltOutlined as ts, ToolOutlined as at, SettingOutlined as ss, FileTextOutlined as Ze, EyeOutlined as _t, UploadOutlined as ut, UnorderedListOutlined as vt, CalendarOutlined as ls, ArrowLeftOutlined as ot, FolderOutlined as wt, FileOutlined as Ct, FileAddOutlined as as, FolderAddOutlined as is, SearchOutlined as ns, DownloadOutlined as os, ApartmentOutlined as rs, WarningOutlined as ds, DashboardOutlined as us, MessageOutlined as cs, SendOutlined as ms, CloseCircleOutlined as Tt, CodeOutlined as ps, AlignLeftOutlined as fs, PlayCircleOutlined as gs } from "@ant-design/icons";
import { a as v } from "./index.js";
import { g as ct, c as Ft, d as Ve } from "./base.js";
import { g as pe, d as hs, b as Ke, L as Ue } from "./components.js";
import It from "react-quill-new";
import { b as rt, u as xs, a as ys } from "./contexts.js";
import { useNavigate as ke, useLocation as bs, useParams as Ye, useSearchParams as js } from "react-router-dom";
import { l as Vs, c as ks, u as Ss, d as _s, g as vs, b as ws, e as Cs, f as Ts, r as Fs } from "./system.js";
import { l as Is, b as As } from "./authorization.js";
import { createStyles as At } from "antd-style";
import Es from "classnames";
import Xe from "@uiw/react-json-view";
import zs from "@uiw/react-codemirror";
import { json as Os } from "@codemirror/lang-json";
const ze = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Ps = {
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
}, Ms = ({ initialData: l, onRefresh: t }) => {
  const { message: i } = ce.useApp(), { t: s } = X("system"), { t: a } = X("common"), [n] = o.useForm(), [d, m] = b((l == null ? void 0 : l.provider) || "custom"), [r, c] = b((l == null ? void 0 : l.provider) === "custom" || (l == null ? void 0 : l.provider) === "autoDiscover"), [u, V] = b((l == null ? void 0 : l.enabled) || !1), [x, L] = b((l == null ? void 0 : l.auto_create_user) || !1), { loading: w, data: P, refresh: j } = F(v.system.getOauthSettings, {
    manual: !!l,
    onSuccess: (f) => {
      n.setFieldsValue(f), m(f.provider), c(f.provider === "custom" || f.provider === "autoDiscover"), V(f.enabled), L(f.auto_create_user);
    },
    onError: (f) => {
      i.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", f);
    }
  });
  Ne(() => {
    l && (n.setFieldsValue(l), m(l.provider), c(l.provider === "custom" || l.provider === "autoDiscover"), V(l.enabled), L(l.auto_create_user));
  }, [l, n]);
  const M = (f) => {
    m(f), c(f === "custom" || f === "autoDiscover");
    const I = Ps[f];
    I && n.setFieldsValue({
      auth_endpoint: I.endpoints.auth_endpoint,
      token_endpoint: I.endpoints.token_endpoint,
      userinfo_endpoint: I.endpoints.userinfo_endpoint,
      scope: I.scope,
      // Set field mappings
      email_field: I.email_field,
      username_field: I.username_field,
      full_name_field: I.full_name_field,
      avatar_field: I.avatar_field,
      role_field: I.role_field,
      // Set display configuration
      icon_url: I.icon_url,
      display_name: I.display_name
    });
  }, k = (f) => {
    V(f);
  }, R = (f) => {
    L(f);
  }, { loading: p, run: B } = F(v.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      i.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), t ? t() : j();
    },
    onError: (f) => {
      i.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", f);
    }
  }), te = (f) => {
    B(f);
  }, Z = () => {
    t ? t() : j();
  }, { loading: Y, run: K } = F(async ({ redirect_uri: f, ...I }) => {
    let $;
    return f ? $ = new URL(f) : $ = new URL(window.location.origin), $.pathname = ct("/system/settings/oauth/test-callback"), $.searchParams.set("provider", d), v.system.testOauthConnection({ redirect_uri: $.toString(), ...I });
  }, {
    manual: !0,
    onSuccess: ({ url: f }) => {
      window.open(f, "_blank");
    },
    onError: (f) => {
      i.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: f.message })), console.error("Failed to test OAuth connection", f);
    }
  }), q = () => d === "custom";
  return /* @__PURE__ */ e.jsx(je, { spinning: w, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: n,
      layout: "vertical",
      onFinish: te,
      initialValues: l || P,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: k })
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
                required: u,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(U, { onChange: M, disabled: !u, children: [
              /* @__PURE__ */ e.jsx(U.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
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
              S,
              {
                disabled: !u,
                placeholder: d !== "custom" ? s(`settings.oauth.provider.options.${d}`, { defaultValue: d }) : ""
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
                pattern: ze,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u, placeholder: "https://example.com/icon.png" })
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
                required: u,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u })
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
                required: u,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S.Password, { disabled: !u, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: u && d === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: ze,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "wellknown_endpoint",
            hidden: d !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: ze,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: u && d === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: u && d === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: ze,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u })
          }
        ),
        q() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: u && d === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: ze,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u })
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
                required: u,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(f) => f.getFieldValue("redirect_uri") !== "" ? {
              pattern: ze,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u, placeholder: `http://${window.location.host}${ct(`/login?provider=settings.${d}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: R, disabled: !u })
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
                required: u && x,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(S, { disabled: !u || !x })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(U, { disabled: !u, children: [
              /* @__PURE__ */ e.jsx(U.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          lt,
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
            children: /* @__PURE__ */ e.jsx(de, { disabled: !u })
          }
        ),
        /* @__PURE__ */ e.jsx(nt, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          lt,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: r ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(S, { placeholder: "email", disabled: !u || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(S, { placeholder: "login", autoComplete: "off", disabled: !u || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(S, { placeholder: "name", disabled: !u || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(S, { placeholder: "avatar_url", disabled: !u || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(S, { placeholder: "role", disabled: !u || !r })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              loading: Y,
              onClick: async () => {
                const f = n.getFieldsValue();
                K(f);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: Z,
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ls = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: i } = X("common"), [s] = o.useForm(), { loading: a, data: n, refresh: d } = F(v.system.getSecuritySettings, {
    onSuccess: (u) => {
      s.setFieldsValue(u);
    },
    onError: (u) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", u);
    }
  }), { loading: m, run: r } = F(v.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), d();
    },
    onError: (u) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", u);
    }
  }), c = (u) => {
    r(u);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: a, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: s,
      layout: "vertical",
      onFinish: c,
      initialValues: n,
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
            children: /* @__PURE__ */ e.jsxs(U, { children: [
              /* @__PURE__ */ e.jsx(U.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(U.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            children: /* @__PURE__ */ e.jsx(me, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
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
            shouldUpdate: (u, V) => u.login_failure_lock !== V.login_failure_lock,
            children: ({ getFieldValue: u }) => u("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
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
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (u, V) => u.login_failure_lock !== V.login_failure_lock,
            children: ({ getFieldValue: u }) => u("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
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
            shouldUpdate: (u, V) => u.history_password_check !== V.history_password_check,
            children: ({ getFieldValue: u }) => u("history_password_check") ? /* @__PURE__ */ e.jsx(
              o.Item,
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
          o.Item,
          {
            name: "user_inactive_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(me, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: m,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => d(),
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ns = ({ fetchItems: l, importItems: t, columns: i, ...s }) => {
  const { message: a } = ce.useApp(), { t: n } = X("system"), [d, m] = b([]), [r, c] = b([]), { run: u, loading: V } = F(l, {
    onError: (w) => {
      a.error(n("settings.ldap.importError", { error: `${w.message}` }));
    },
    onSuccess: (w) => {
      m(w);
    },
    manual: !0
  }), { run: x, loading: L } = F(async () => {
    for (const w of r.filter((P) => {
      const j = d.find((M) => M.ldap_dn === P);
      return !(!j || j.status === "imported");
    })) {
      const P = await t([w]);
      m((j) => [...j].map((k) => {
        for (const R of P)
          if (k.ldap_dn === R.ldap_dn)
            return { ...R, status: "imported" };
        return k;
      }));
    }
  }, {
    manual: !0
  });
  return Ne(() => {
    s.visible && (m([]), u(), c([]));
  }, [s.visible]), /* @__PURE__ */ e.jsx(
    fe,
    {
      title: n("settings.ldap.importTitle"),
      ...s,
      onOk: () => {
        x();
      },
      width: 900,
      confirmLoading: L,
      loading: V,
      children: /* @__PURE__ */ e.jsx(
        Le,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (w) => {
              c(w);
            },
            getCheckboxProps: (w) => ({
              disabled: w.status === "imported"
            })
          },
          columns: i.map(({ render: w, ...P }) => w ? {
            ...P,
            render: (j, M, k) => {
              const R = r.includes(M.ldap_dn) && L && M.status !== "imported";
              return w(j, M, k, R);
            }
          } : P),
          dataSource: d,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Rs = () => {
  var M, k, R;
  const { message: l } = ce.useApp(), { t } = X("system"), [i] = o.useForm(), [s, a] = b(!1), [n, d] = b(null), [m, r] = b(!1), [c, u] = b(!1), [V] = o.useForm(), [x, L] = b(!1);
  F(v.system.getLdapSettings, {
    onSuccess: (p) => {
      i.setFieldsValue(p), L(p.enabled);
    },
    onError: (p) => {
      l.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${p.message}` }));
    }
  }), Ne(() => {
    d(null);
  }, [m]);
  const w = async (p) => {
    a(!0);
    try {
      await v.system.updateLdapSettings(p), l.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      l.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      a(!1);
    }
  }, { run: P, loading: j } = F(async (p) => {
    const B = await i.validateFields();
    return await v.system.testLdapConnection({
      ...p,
      ...B
    });
  }, {
    onSuccess: (p) => {
      d(p);
    },
    onError: (p) => {
      l.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${p.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      o,
      {
        form: i,
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
            o.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { onChange: (p) => L(p) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: x, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: x, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: x, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(S.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: x, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: x, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: x, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: x, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: x, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(S, { type: "number", defaultValue: 15, disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(nt, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
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
              children: /* @__PURE__ */ e.jsx(S.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(S.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(S.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !x,
                style: { marginLeft: 8 },
                onClick: () => r(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !x,
                style: { marginLeft: 8 },
                onClick: () => {
                  u(!0);
                },
                children: t("settings.ldap.import", { defaultValue: "Import Users" })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      fe,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: m,
        onCancel: () => r(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            o,
            {
              form: V,
              layout: "vertical",
              onFinish: P,
              children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(S, { disabled: !x })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(S.Password, { disabled: !x })
                  }
                ),
                /* @__PURE__ */ e.jsxs(o.Item, { children: [
                  /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { disabled: !x, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    E,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => r(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(je, { spinning: j, children: /* @__PURE__ */ e.jsx(Nt, { active: j, loading: j, children: n && (n.user ? /* @__PURE__ */ e.jsxs(oe, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(oe.Item, { label: "Username", span: 3, children: n.user.username }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "Email", span: 3, children: n.user.email }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "FullName", span: 3, children: n.user.full_name }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "CreatedAt", span: 3, children: n.user.created_at }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "UpdatedAt", span: 3, children: n.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Rt,
            {
              direction: "vertical",
              current: (M = n.message) == null ? void 0 : M.findIndex((p) => !p.success),
              status: (k = n.message) != null && k.find((p) => !p.success) ? "error" : "finish",
              items: (R = n.message) == null ? void 0 : R.map((p) => ({
                status: p.success ? "finish" : "error",
                title: p.message
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
        onCancel: () => u(!1),
        fetchItems: () => v.system.importLdapUsers({}),
        importItems: (p) => v.system.importLdapUsers({ user_dn: p }),
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
          render: (p, B, te, Z) => Z ? /* @__PURE__ */ e.jsx(je, { indicator: /* @__PURE__ */ e.jsx(Gt, { spin: !0 }) }) : p ? /* @__PURE__ */ e.jsx(Zt, { twoToneColor: "#52c41a" }) : B.id ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ne, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Ds = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: i } = X("common"), [s] = o.useForm(), [a, n] = b(null), [d, m] = b(!1), [r] = o.useForm(), [c, u] = b(!1), { data: V } = F(v.system.getSmtpSettingFields), { loading: x } = F(v.system.getSmtpSettings, {
    onSuccess: (k) => {
      s.setFieldsValue(k), u(k.enabled);
    },
    onError: (k) => {
      l.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${k.message}` }));
    }
  });
  Ne(() => {
    n(null);
  }, [d]);
  const { run: L, loading: w } = F(({ port: k, ...R }) => v.system.updateSmtpSettings({ ...R, port: Number(k) }), {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (k) => {
      l.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${k.message}` }));
    }
  }), { run: P, loading: j } = F(async (k) => {
    const { port: R, ...p } = await s.validateFields();
    return await v.system.testSmtpConnection({
      ...k,
      ...p,
      port: Number(R)
    });
  }, {
    onSuccess: (k) => {
      n(k);
    },
    onError: (k) => {
      l.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${k.message}` }));
    },
    manual: !0
  }), M = (k) => {
    switch (k.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !c, min: k.min, max: k.max, step: k.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, disabled: !c, min: 0, max: 100, step: k.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx(U, { mode: "tags", tokenSeparators: [","], disabled: !c });
      case "enum":
        return /* @__PURE__ */ e.jsx(U, { disabled: !c, options: k.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(It, { theme: "snow", readOnly: !c });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(S, { disabled: !c });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(je, { spinning: x, children: /* @__PURE__ */ e.jsxs(
      o,
      {
        form: s,
        layout: "vertical",
        onFinish: L,
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (k) => u(k) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: c, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !c, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: c, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { type: "number", disabled: !c, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: c, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(S, { disabled: !c, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(S.Password, { disabled: !c, autoComplete: "new-password" })
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
              children: /* @__PURE__ */ e.jsx(S, { disabled: !c, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(S, { disabled: !c, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.adminEmails", { defaultValue: "Admin Emails" }),
              name: "admin_emails",
              tooltip: t("settings.smtp.adminEmailsTooltip", { defaultValue: "Email addresses that receive admin notifications." }),
              children: /* @__PURE__ */ e.jsx(
                U,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !c,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(nt, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (V || []).map((k) => /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t(k.label_key || `settings.smtp.${k.key}`, { defaultValue: k.key }),
              name: k.key,
              tooltip: k.tooltip_key ? t(k.tooltip_key, { defaultValue: "" }) : void 0,
              children: M(k)
            },
            k.key
          )),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: w, style: { marginRight: 8 }, children: i("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              E,
              {
                onClick: () => m(!0),
                disabled: !c || j,
                loading: j,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: d,
        onCancel: () => m(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => m(!1), children: i("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(E, { type: "primary", loading: j, onClick: () => r.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: r,
            layout: "vertical",
            onFinish: (k) => P(k),
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
                  children: /* @__PURE__ */ e.jsx(S, { placeholder: "test@example.com" })
                }
              ),
              a && /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: a.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: a.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Us = () => {
  const { message: l } = ce.useApp(), { t, i18n: i } = X("system"), { t: s } = X("common"), [a] = o.useForm(), { fetchSiteConfig: n, currentOrgId: d } = rt(), { user: m } = xs(), r = o.useWatch("enable_multi_org", a), c = o.useWatch("default_organization_id", a), u = ve(() => {
    var B;
    const p = (B = m == null ? void 0 : m.organizations) == null ? void 0 : B.find((te) => te.id === d);
    return p != null && p.name ? `${p.name} (${d})` : d || "";
  }, [m == null ? void 0 : m.organizations, d]), V = ve(() => {
    var B;
    const p = (B = m == null ? void 0 : m.organizations) == null ? void 0 : B.find((te) => te.id === c);
    return p != null && p.name ? `${p.name} (${c})` : c || "";
  }, [m == null ? void 0 : m.organizations, c]), { loading: x, data: L, refresh: w } = F(v.system.getSystemBaseSettings, {
    onSuccess: (p) => {
      a.setFieldsValue(p);
    },
    onError: (p) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", p);
    }
  }), { loading: P, run: j } = F(v.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: async () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), w(), await n();
    },
    onError: (p) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", p);
    }
  }), { loading: M, run: k } = F(v.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      l.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (p) => {
      l.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", p);
    }
  }), R = (p) => {
    j(p);
  };
  return /* @__PURE__ */ e.jsx(je, { spinning: x, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: a,
      layout: "vertical",
      onFinish: R,
      initialValues: L,
      children: [
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(jt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", children: /* @__PURE__ */ e.jsx(S, {}) }) })
        }, ...hs.map((p) => ({
          key: p.lang,
          label: i.language !== p.lang ? s(`language.${p.lang}`, { defaultValue: p.label, lang: p.label }) : p.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: ["name_i18n", p.lang], children: /* @__PURE__ */ e.jsx(S, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(S, {}) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(S, {}) }),
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
        /* @__PURE__ */ e.jsx(o.Item, { name: "default_organization_id", hidden: !0, children: /* @__PURE__ */ e.jsx(S, {}) }),
        !r && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.defaultOrganization", { defaultValue: "Default Organization" }),
            tooltip: t("settings.base.defaultOrganizationTooltip", {
              defaultValue: "Used when multi-organization is disabled. Switching multi-organization off sets this to the currently selected organization."
            }),
            children: /* @__PURE__ */ e.jsx(S, { value: V, disabled: !0 })
          }
        ),
        r && u && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.currentOrganization", { defaultValue: "Current Organization" }),
            tooltip: t("settings.base.currentOrganizationTooltip", {
              defaultValue: "If you disable multi-organization, this organization will become the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(S, { value: u, disabled: !0 })
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
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: P,
              icon: /* @__PURE__ */ e.jsx(We, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => w(),
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Dt,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => k(),
              children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Xt, {}), loading: M, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, $s = He(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: mt } = S, qs = () => {
  var A;
  const { message: l } = ce.useApp(), { t } = X("ai"), { t: i } = X("common"), s = ke(), [a] = o.useForm(), [n, d] = b(!1), [m, r] = b(null), [c, u] = b(""), [V, x] = b(""), { loading: L, data: w } = F(
    () => v.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (g) => {
        l.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", g);
      }
    }
  ), P = ve(() => w == null ? void 0 : w.find((g) => g.provider === V), [w, V]), { loading: j, data: M, refresh: k } = F(
    () => v.ai.listAiModels({ current: 1, page_size: 100, search: c }),
    {
      refreshDeps: [c],
      onError: (g) => {
        l.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", g);
      }
    }
  ), { loading: R, run: p } = F(
    ({ config: g, ...z }) => v.ai.createAiModel({ config: g ?? {}, ...z }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), d(!1), a.resetFields(), k();
      },
      onError: (g) => {
        l.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", g);
      }
    }
  ), { loading: B, run: te } = F(
    ({ id: g, data: z }) => v.ai.updateAiModel({ id: g }, z),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), d(!1), a.resetFields(), r(null), k();
      },
      onError: (g) => {
        l.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", g);
      }
    }
  ), { runAsync: Z } = F(
    (g) => v.ai.deleteAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), k();
      },
      onError: (g) => {
        l.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", g);
      }
    }
  ), { runAsync: Y } = F(
    (g) => v.ai.testAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (g) => {
        l.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", g);
      }
    }
  ), { runAsync: K } = F(
    (g) => v.ai.setDefaultAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), k();
      },
      onError: (g) => {
        l.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", g);
      }
    }
  ), q = () => {
    r(null), x(""), a.resetFields(), d(!0);
  }, f = (g) => {
    r(g), x(g.provider);
    const z = g.config || {}, Q = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      is_default: g.is_default,
      config: z,
      // Spread config fields to form
      status: g.status,
      system_prompt: g.system_prompt ?? "",
      max_chat_tokens: g.max_chat_tokens ?? 0,
      max_chat_iterations: g.max_chat_iterations ?? 0
    };
    a.setFieldsValue(Q), d(!0);
  }, I = async (g) => {
    r(null), x(g.provider), a.resetFields();
    try {
      const z = await v.ai.getAiModel({ id: g.id }), Q = { ...z.config || {} };
      "api_key" in Q && (Q.api_key = ""), a.setFieldsValue({
        name: `${z.name} (copy)`,
        description: z.description,
        provider: z.provider,
        config: Q,
        is_default: !1,
        status: "enabled",
        system_prompt: z.system_prompt ?? "",
        max_chat_tokens: z.max_chat_tokens ?? 0,
        max_chat_iterations: z.max_chat_iterations ?? 0
      }), d(!0);
    } catch {
      l.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, $ = (g) => {
    x(g), a.setFieldValue("config", void 0);
  }, H = (g) => {
    const z = g.config ?? {}, Q = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      config: z,
      is_default: g.is_default,
      status: g.status,
      system_prompt: g.system_prompt ?? "",
      max_chat_tokens: g.max_chat_tokens ?? 0,
      max_chat_iterations: g.max_chat_iterations ?? 0
    };
    m ? te({ id: m.id, data: Q }) : p(Q);
  }, C = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (g, z) => /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx("span", { children: g }),
        z.is_default && /* @__PURE__ */ e.jsx(Qe, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Qt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (g) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: g.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (g) => /* @__PURE__ */ e.jsx(ne, { color: g === "enabled" ? "green" : "red", children: g === "enabled" ? i("enabled", { defaultValue: "Enabled" }) : i("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (g, z) => /* @__PURE__ */ e.jsx(Ke, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Yt, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => Y(z.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(es, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => K(z.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Re, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => f(z)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(kt, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => I(z)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => Z(z.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Be, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsx(
        S.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (g) => u(g),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(St, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(we, {}),
            onClick: k,
            loading: j,
            children: i("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(De, {}),
            onClick: q,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Le,
      {
        columns: C,
        dataSource: (M == null ? void 0 : M.data) || [],
        loading: j,
        rowKey: "id",
        pagination: {
          total: (M == null ? void 0 : M.total) || 0,
          current: (M == null ? void 0 : M.current) || 1,
          pageSize: (M == null ? void 0 : M.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (g, z) => i("pagination.total", {
            defaultValue: `${z[0]}-${z[1]} of ${g} items`,
            start: z[0],
            end: z[1],
            total: g
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: m ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: n,
        onCancel: () => {
          d(!1), a.resetFields(), r(null);
        },
        footer: null,
        width: ((A = P == null ? void 0 : P.ui_schema) == null ? void 0 : A["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: a,
            layout: "vertical",
            onFinish: H,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(S, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      mt,
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
                      U,
                      {
                        loading: L,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: $,
                        value: V,
                        options: w == null ? void 0 : w.map((g) => ({
                          label: g.name,
                          value: g.provider
                        }))
                      }
                    )
                  }
                ),
                P && /* @__PURE__ */ e.jsx(o.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(
                  $s,
                  {
                    name: "config",
                    schema: P.config_schema,
                    uiSchema: P.ui_schema
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
                      mt,
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
                  /* @__PURE__ */ e.jsx(_e, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(me, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(_e, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
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
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "is_default",
                    valuePropName: "checked",
                    label: t("models.setAsDefault", { defaultValue: "Set as default model" }),
                    children: /* @__PURE__ */ e.jsx(de, {})
                  }
                ),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(S, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: R || B,
                    children: m ? i("update", { defaultValue: "Update" }) : i("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      d(!1), a.resetFields(), r(null), x("");
                    },
                    children: i("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    )
  ] });
}, Bs = He(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: Js } = S, Hs = () => {
  var xe;
  const { message: l } = ce.useApp(), { t } = X("system"), { t: i } = X("common"), s = ke(), [a] = o.useForm(), [n, d] = b(!1), [m, r] = b(null), [c, u] = b(""), [V, x] = b(!1), [L, w] = b(null), [P, j] = b(""), [M, k] = b(!1), [R, p] = b([]), [B, te] = b(), [Z, Y] = b(null), { loading: K, data: q, refresh: f } = F(
    () => v.system.listToolSets({ current: 1, page_size: 100, search: c, type: B }),
    {
      refreshDeps: [c, B],
      onError: (y) => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", y);
      }
    }
  ), { loading: I, data: $ } = F(
    () => v.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (y) => {
        l.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", y);
      }
    }
  ), H = ve(() => $ == null ? void 0 : $.find((y) => y.tool_set_type === P), [$, P]), { loading: C, run: A } = F(
    (y) => v.system.createToolSet({
      ...y,
      type: y.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), d(!1), a.resetFields(), f();
      },
      onError: (y) => {
        l.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", y);
      }
    }
  ), { loading: g, run: z } = F(
    ({ id: y, data: D }) => v.system.updateToolSet({ id: y }, {
      ...D,
      type: D.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), a.resetFields(), r(null), f();
      },
      onError: (y) => {
        l.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", y);
      }
    }
  ), { run: Q } = F(
    (y) => v.system.deleteToolSet({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), f();
      },
      onError: (y) => {
        l.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", y);
      }
    }
  ), { runAsync: G } = F(
    (y) => v.system.testToolSet({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (y) => {
        l.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", y);
      }
    }
  ), { loading: ue, runAsync: be } = F(
    (y) => v.system.getToolSetTools({ id: y }),
    {
      manual: !0,
      onSuccess: (y) => {
        p(y || []), k(!0);
      },
      onError: (y) => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", y);
      }
    }
  ), Fe = ye(
    async (y, D) => {
      Y(y.id);
      try {
        await v.system.updateToolSetStatus(
          { id: y.id },
          { status: D ? "enabled" : "disabled" }
        ), l.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), f();
      } catch (T) {
        l.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", T);
      } finally {
        Y(null);
      }
    },
    [t, f]
  ), Ie = () => {
    r(null), a.resetFields(), j(""), d(!0);
  }, Ae = (y) => {
    r(y), j(y.type);
    const D = { ...y };
    a.setFieldsValue(D), d(!0);
  }, Te = (y) => {
    j(y), a.setFieldValue("config", {});
  }, Se = (y) => {
    m ? z({ id: m.id, data: y }) : A(y);
  }, Ce = (y) => {
    Q(y);
  }, _ = (y) => {
    w(y), x(!0);
  }, ie = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (y, D) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: y }),
        D.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
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
      render: (y, D) => {
        const T = D.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: T ? "green" : "red", children: T ? i("enabled", { defaultValue: "Enabled" }) : i("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Qe,
              {
                title: T ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: T,
                    loading: Z === D.id,
                    onChange: (O) => void Fe(D, O)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (y, D) => /* @__PURE__ */ e.jsx(Ke, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(St, {}),
          disabled: D.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${D.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(ts, {}),
          disabled: D.status !== "enabled",
          onClick: async () => G(D.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(at, {}),
          permission: "system:toolsets:view",
          disabled: D.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => be(D.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(ss, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => _(D.config),
          disabled: !D.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: D.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Re, {}),
          onClick: async () => Ae(D),
          disabled: !!D.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          permission: "system:toolsets:delete",
          tooltip: D.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : i("delete", { defaultValue: "Delete" }),
          onClick: async () => Ce(D.id),
          danger: !0,
          disabled: !!D.is_preset,
          confirm: D.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => Ce(D.id),
            okText: i("confirm", { defaultValue: "Confirm" }),
            cancelText: i("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Be, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          S.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (y) => u(y),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          U,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: B,
            onChange: (y) => te(y),
            options: $ == null ? void 0 : $.map((y) => ({
              label: y.name,
              value: y.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(U.Option, { value: "", children: "All" }),
              $ == null ? void 0 : $.map((y) => /* @__PURE__ */ e.jsx(U.Option, { value: y.tool_set_type, children: y.name }, y.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(we, {}),
            onClick: f,
            loading: K,
            children: i("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(De, {}),
            onClick: Ie,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Le,
      {
        columns: ie,
        dataSource: (q == null ? void 0 : q.data) || [],
        loading: K,
        rowKey: "id",
        pagination: {
          total: (q == null ? void 0 : q.total) || 0,
          current: (q == null ? void 0 : q.current) || 1,
          pageSize: (q == null ? void 0 : q.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (y, D) => i("pagination.total", {
            defaultValue: `${D[0]}-${D[1]} of ${y} items`,
            start: D[0],
            end: D[1],
            total: y
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: m ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: n,
        onCancel: () => {
          d(!1), a.resetFields(), r(null), j("");
        },
        footer: null,
        width: ((xe = H == null ? void 0 : H.ui_schema) == null ? void 0 : xe["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: a,
            layout: "vertical",
            onFinish: Se,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(S, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("settings.toolsets.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      Js,
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
                      U,
                      {
                        loading: I,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: Te,
                        value: P,
                        options: $ == null ? void 0 : $.map((y) => ({
                          label: y.name,
                          value: y.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(
                  Bs,
                  {
                    name: "config",
                    schema: H == null ? void 0 : H.config_schema,
                    uiSchema: H == null ? void 0 : H.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(S, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: C || g,
                    children: m ? i("update", { defaultValue: "Update" }) : i("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      d(!1), a.resetFields(), r(null), j("");
                    },
                    children: i("cancel", { defaultValue: "Cancel" })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: V,
        onCancel: () => x(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => x(!1), children: i("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(L, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: M,
        onCancel: () => k(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => k(!1), children: i("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ue ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(we, { style: { fontSize: 24 }, spin: !0 }) }) : R.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : R.map((y, D) => {
          var T, O, se;
          return /* @__PURE__ */ e.jsx(
            ae,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(at, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((T = y.function) == null ? void 0 : T.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Be, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(_e, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((O = y.function) == null ? void 0 : O.description) || "-" })
                ] }),
                ((se = y.function) == null ? void 0 : se.parameters) && /* @__PURE__ */ e.jsxs(_e, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(y.function.parameters, null, 2) })
                ] })
              ] })
            },
            D
          );
        }) })
      }
    )
  ] });
}, { TextArea: pt } = S;
function Ws(l, t) {
  const i = {}, s = [], a = new Map(t.map((n) => [n.id, n]));
  for (const n of l) {
    if (n.toolset_id === "*") {
      s.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const d = a.get(n.toolset_id);
    if (!d) {
      s.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const m = (d.tools || []).map((r) => r.name);
    if (n.tool_name === "*") {
      i[n.toolset_id] = [...m];
      continue;
    }
    m.includes(n.tool_name) ? (i[n.toolset_id] || (i[n.toolset_id] = []), i[n.toolset_id].includes(n.tool_name) || i[n.toolset_id].push(n.tool_name)) : s.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
  }
  return { selections: i, extraPatterns: s };
}
function Ks(l, t) {
  const i = [], s = /* @__PURE__ */ new Set();
  for (const [a, n] of Object.entries(l))
    for (const d of n) {
      const m = `${a}|${d}`;
      s.has(m) || (s.add(m), i.push({ toolset_id: a, tool_name: d }));
    }
  for (const a of t) {
    const n = a.toolset_id.trim(), d = a.tool_name.trim();
    if (!n || !d)
      continue;
    const m = `${n}|${d}`;
    s.has(m) || (s.add(m), i.push({ toolset_id: n, tool_name: d }));
  }
  return i;
}
function Et(l, t) {
  const i = t.trim();
  return !i || l.some((s) => s.value === i) ? l : [...l, { value: i, label: i }];
}
function Gs(l, t, i, s) {
  const n = [{ value: "*", label: s }], d = /* @__PURE__ */ new Set(["*"]), m = (r, c) => {
    d.has(r) || (d.add(r), n.push({
      value: r,
      label: c ? `${r} — ${c}` : r
    }));
  };
  if (t && t !== "*") {
    const r = l.find((c) => c.id === t);
    for (const c of (r == null ? void 0 : r.tools) || [])
      m(c.name, c.description);
  } else
    for (const r of l)
      for (const c of r.tools || [])
        m(c.name, c.description);
  return Et(n, i);
}
const Zs = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: i } = X("common"), s = ke(), { enableSkillToolBinding: a } = rt(), [n] = o.useForm(), [d, m] = b(""), [r, c] = b(), [u, V] = b("user"), [x, L] = b(!1), [w, P] = b(null), [j, M] = b(null), [k, R] = b(!1), [p] = o.useForm(), [B, te] = b(!1), [Z, Y] = b(null), [K, q] = b([]), [f, I] = b({}), [$, H] = b([]), [C, A] = b(!1), g = ve(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...K.map((h) => ({
      value: h.id,
      label: `${h.name} (${h.id})`
    }))
  ], [K, t]), z = ye(() => {
    q([]), I({}), H([]);
  }, []), { loading: Q, data: G, refresh: ue } = F(
    () => v.system.listSkills({
      current: 1,
      page_size: 100,
      search: d || void 0,
      domain: r,
      is_preset: u === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [d, r, u],
      onError: () => {
        l.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: be = [] } = F(() => v.system.listSkillDomains()), Fe = (G == null ? void 0 : G.data) || [], Ie = (G == null ? void 0 : G.total) || 0, { run: Ae } = F(
    (h) => v.system.deleteSkill({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), ue();
      },
      onError: () => {
        l.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Te = ye(
    async (h, N) => {
      Y(h.id);
      try {
        await v.system.updateSkillStatus({ id: h.id }, { status: N ? "enabled" : "disabled" }), l.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ue();
      } catch {
        l.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        Y(null);
      }
    },
    [t, ue]
  ), { loading: Se, run: Ce } = F(
    (h) => v.system.uploadSkill(h.body, h.file),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), R(!1), p.resetFields(), ue();
      },
      onError: () => {
        l.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), _ = ye(
    async (h) => {
      var N;
      A(!0);
      try {
        const [J, re] = await Promise.all([
          v.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          v.system.listSkillAiToolBindings(
            { id: h, current: 1, page_size: 1e3 }
          )
        ]), ee = ((N = J.data) == null ? void 0 : N.filter((Lt) => Lt.status === "enabled")) || [];
        q(ee);
        const { selections: le, extraPatterns: $e } = Ws(re.data || [], ee);
        I(le), H($e);
      } catch {
        l.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), z();
      } finally {
        A(!1);
      }
    },
    [z, t]
  );
  Ne(() => {
    !x || !(w != null && w.id) || !a || _(w.id);
  }, [x, w == null ? void 0 : w.id, a, _]);
  const ie = (h, N) => {
    I((J) => ({ ...J, [h]: N }));
  }, xe = (h, N, J) => {
    I((re) => ({
      ...re,
      [h]: J ? [...N] : []
    }));
  }, y = () => {
    P(null), M(null), n.resetFields(), z(), L(!0);
  }, D = (h) => {
    P(h), M(null), n.setFieldsValue({
      name: h.name,
      description: h.description,
      category: h.category,
      domain: h.domain
    }), z(), L(!0);
  }, T = (h) => {
    P(null), M(h), n.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: h.name, defaultValue: "{{name}} (copy)" }),
      description: h.description,
      category: h.category,
      domain: h.domain
    }), z(), L(!0);
  }, O = () => {
    n.validateFields().then(async (h) => {
      te(!0);
      try {
        if (w) {
          const N = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          };
          if (await v.system.updateSkill({ id: w.id }, N), a) {
            const J = Ks(f, $);
            await v.system.replaceSkillAiToolBindings(
              { id: w.id },
              { bindings: J }
            );
          }
          l.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (j) {
          const N = {
            source_id: j.id,
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          }, { id: J } = await v.system.cloneSkill(N);
          l.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), L(!1), M(null), n.resetFields(), z(), ue(), J && s(`/system/settings/skills/${J}/edit`);
          return;
        } else {
          const N = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? "",
            content: h.content ?? ""
          };
          await v.system.createSkill(N), l.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        L(!1), P(null), M(null), n.resetFields(), z(), ue();
      } catch {
        l.error(
          w ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : j ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        te(!1);
      }
    });
  }, se = () => {
    var ee, le;
    const h = (ee = p.getFieldValue("file")) == null ? void 0 : ee.fileList, N = ((le = h == null ? void 0 : h[0]) == null ? void 0 : le.originFileObj) ?? (h == null ? void 0 : h[0]);
    if (!N) {
      l.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const J = p.getFieldValue("category"), re = p.getFieldValue("domain");
    Ce({ body: { category: J, domain: re }, file: N });
  }, ge = a && w, Ge = ge ? 720 : 560, Pt = !w && !j, Mt = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (h, N) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: h }),
        N.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (h) => h ? /* @__PURE__ */ e.jsx(ne, { children: h }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (h) => h ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: h }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (h, N) => {
        const J = N.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: J ? "green" : "red", children: J ? i("enabled", { defaultValue: "Enabled" }) : i("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Qe,
              {
                title: J ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: J,
                    loading: Z === N.id,
                    onChange: (re) => void Te(N, re)
                  }
                ) })
              }
            )
          }
        );
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 220,
      render: (h, N) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Ze, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${N.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!N.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(_t, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${N.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Re, {}),
              tooltip: N.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => D(N),
              permission: "system:skills:update",
              disabled: !!N.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(kt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => T(N),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ee, {}),
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
                okText: i("confirm", { defaultValue: "Confirm" }),
                cancelText: i("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => Ae(N.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Be, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          S.Search,
          {
            placeholder: i("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: m,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          U,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: r,
            onChange: c,
            options: be.map((h) => ({ value: h, label: h }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          qe.Group,
          {
            optionType: "button",
            value: u,
            onChange: (h) => V(h.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: () => ue(), children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: y, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ut, {}), onClick: () => R(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsx(
        Le,
        {
          rowKey: "id",
          loading: Q,
          columns: Mt,
          dataSource: Fe,
          pagination: { total: Ie, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          title: w ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : j ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: x,
          onOk: O,
          onCancel: () => {
            L(!1), P(null), M(null), z();
          },
          confirmLoading: B,
          width: Ge,
          children: /* @__PURE__ */ e.jsxs(o, { form: n, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(S, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(pt, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(S, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(U, { allowClear: !0, placeholder: i("optional", { defaultValue: "Optional" }), options: be.map((h) => ({ value: h, label: h })) }) }),
            Pt && /* @__PURE__ */ e.jsx(o.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(pt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            ge && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(je, { spinning: C, children: K.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(W, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: K.map((h) => {
                const N = (h.tools || []).map((le) => le.name), J = f[h.id] || [], re = N.length > 0 && J.length === N.length, ee = J.length > 0 && J.length < N.length;
                return /* @__PURE__ */ e.jsx(
                  ae,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        et,
                        {
                          checked: re,
                          indeterminate: ee,
                          onChange: (le) => xe(h.id, N, le.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: h.name })
                    ] }),
                    extra: h.description ? /* @__PURE__ */ e.jsx("span", { children: h.description }) : void 0,
                    children: (h.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(et.Group, { style: { width: "100%" }, value: J, onChange: (le) => ie(h.id, le), children: /* @__PURE__ */ e.jsx(W, { direction: "vertical", style: { width: "100%" }, children: (h.tools || []).map((le) => /* @__PURE__ */ e.jsx(et, { value: le.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: le.name }),
                      le.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: le.description })
                    ] }) }, le.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Pe,
                      {
                        image: Pe.PRESENTED_IMAGE_SIMPLE,
                        description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                      }
                    )
                  },
                  h.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, children: [
                  $.map((h, N) => /* @__PURE__ */ e.jsxs(
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
                          dt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: h.toolset_id,
                            options: Et(g, h.toolset_id),
                            filterOption: (J, re) => {
                              const ee = re;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(J.toLowerCase());
                            },
                            onChange: (J) => {
                              const re = typeof J == "string" ? J : "";
                              H(
                                (ee) => ee.map((le, $e) => $e === N ? { ...le, toolset_id: re } : le)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          dt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: h.tool_name,
                            options: Gs(
                              K,
                              h.toolset_id,
                              h.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (J, re) => {
                              const ee = re;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(J.toLowerCase());
                            },
                            onChange: (J) => {
                              const re = typeof J == "string" ? J : "";
                              H(
                                (ee) => ee.map((le, $e) => $e === N ? { ...le, tool_name: re } : le)
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
                            onClick: () => H((J) => J.filter((re, ee) => ee !== N)),
                            children: i("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    N
                  )),
                  /* @__PURE__ */ e.jsx(E, { type: "dashed", onClick: () => H((h) => [...h, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              Pe,
              {
                image: Pe.PRESENTED_IMAGE_SIMPLE,
                description: t("settings.skills.aiToolsetsEmpty", { defaultValue: "No AI toolsets available for this organization." })
              }
            ) }) })
          ] })
        }
      ),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: k,
          onOk: se,
          onCancel: () => R(!1),
          confirmLoading: Se,
          children: /* @__PURE__ */ e.jsxs(o, { form: p, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Ut, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ut, {}), children: i("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(S, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(U, { allowClear: !0, placeholder: i("optional", { defaultValue: "Optional" }), options: be.map((h) => ({ value: h, label: h })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Xs = () => {
  const { message: l } = ce.useApp(), t = ke(), { t: i } = X("system"), { t: s } = X("task"), { t: a } = X("common"), [n] = o.useForm(), { data: d } = F(v.system.listLogStorageBackends), { data: m } = F(v.system.getTaskSettingFields), r = (d ?? []).map((j) => ({
    value: j.id,
    label: i(`settings.task.logStorage.${j.id}`, { defaultValue: j.name })
  })), { loading: c, refresh: u } = F(v.system.getTaskSettings, {
    onSuccess: (j) => {
      j && n.setFieldsValue(j);
    },
    onError: () => {
      l.error(i("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: V, run: x } = F(v.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      l.success(i("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), u();
    },
    onError: () => {
      l.error(i("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), L = (j) => {
    x(j);
  }, w = (j) => {
    switch (j.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          me,
          {
            style: { width: "100%" },
            addonAfter: j.key.includes("retention_days") ? i("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx(U, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx(U, { options: j.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(It, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(S, {});
    }
  }, P = (j) => j.value_type === "int" || j.value_type === "number" || j.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(je, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: n,
      layout: "vertical",
      onFinish: L,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "log_storage_backend",
            label: i("settings.task.logStorageBackend", { defaultValue: "Log storage" }),
            tooltip: i("settings.task.logStorageBackendTooltip", {
              defaultValue: "Where task execution logs are stored. Database stores logs in the application database."
            }),
            children: /* @__PURE__ */ e.jsx(
              U,
              {
                options: r,
                placeholder: i("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: d === void 0
              }
            )
          }
        ),
        (m ?? []).map((j) => /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: j.key,
            label: i(`settings.task.fields.${j.key}`, { defaultValue: j.key }),
            rules: P(j),
            valuePropName: j.value_type === "bool" ? "checked" : "value",
            children: w(j)
          },
          j.key
        )),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: V, icon: /* @__PURE__ */ e.jsx(We, {}), children: a("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(E, { onClick: () => u(), icon: /* @__PURE__ */ e.jsx(we, {}), children: a("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(vt, {}), onClick: () => t("/tasks"), children: s("listTitle", { defaultValue: "Task List" }) }),
          /* @__PURE__ */ e.jsx(pe, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ls, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Qs } = S, Ys = /^[-_a-zA-Z0-9.]+$/, el = () => {
  const { message: l, modal: t } = ce.useApp(), i = ke(), { t: s, i18n: a } = X("system"), { t: n } = X("common"), d = (C) => {
    if (!C) return "-";
    const A = new Date(C);
    return Number.isNaN(A.getTime()) ? "-" : A.toLocaleString(a.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [m] = o.useForm(), [r, c] = b(!1), [u, V] = b(null), [x, L] = b(""), [w, P] = b(1), [j, M] = b(10), { loading: k, data: R, refresh: p } = F(
    () => Vs({ current: w, page_size: j, search: x }),
    {
      refreshDeps: [w, j, x],
      onError: (C) => {
        l.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", C);
      }
    }
  ), { loading: B, run: te } = F(
    (C) => ks(C),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), c(!1), m.resetFields(), V(null), p();
      },
      onError: (C) => {
        l.error((C == null ? void 0 : C.err) || s("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: Z, run: Y } = F(
    ({ id: C, ...A }) => Ss({ id: C }, A),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), c(!1), m.resetFields(), V(null), p();
      },
      onError: (C) => {
        l.error((C == null ? void 0 : C.err) || s("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: K } = F(
    (C) => _s({ id: C }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), p();
      },
      onError: (C) => {
        l.error((C == null ? void 0 : C.err) || s("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), q = () => {
    V(null), m.resetFields(), m.setFieldsValue({ status: "active" }), c(!0);
  }, f = (C) => {
    V(C), m.setFieldsValue({
      name: C.name,
      slug: C.slug,
      description: C.description,
      status: C.status
    }), c(!0);
  }, I = (C) => {
    t.confirm({
      title: s("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: s("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${C.name}"? This action cannot be undone.`
      }),
      onOk: () => K(C.id)
    });
  }, $ = () => {
    m.validateFields().then((C) => {
      u ? Y({ id: u.id, ...C }) : te(C);
    });
  }, H = [
    {
      title: s("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: s("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (C) => C || "-"
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
      render: (C) => /* @__PURE__ */ e.jsx(ne, { color: C === "active" ? "green" : "default", children: C === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (C) => d(C)
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (C, A) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(_t, {}),
              onClick: async () => i(`/system/settings/organizations/${A.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Re, {}),
              onClick: async () => f(A),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ee, {}),
              danger: !0,
              onClick: async () => I(A),
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
      title: s("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: p, children: n("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: q, children: s("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            S.Search,
            {
              placeholder: s("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (C) => {
                L(C), P(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Le,
            {
              columns: H,
              dataSource: (R == null ? void 0 : R.data) || [],
              loading: k,
              rowKey: "id",
              pagination: {
                current: w,
                pageSize: j,
                total: (R == null ? void 0 : R.total) || 0,
                showSizeChanger: !0,
                showTotal: (C, A) => n("pagination.total", {
                  defaultValue: `${A[0]}-${A[1]} of ${C} items`,
                  start: A[0],
                  end: A[1],
                  total: C
                }),
                onChange: (C, A) => {
                  P(C), M(A);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: u ? s("settings.organizations.edit", { defaultValue: "Edit Organization" }) : s("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: r,
            onOk: $,
            onCancel: () => {
              c(!1), m.resetFields(), V(null);
            },
            confirmLoading: B || Z,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(o, { form: m, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "name",
                  label: s("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: s("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(S, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "slug",
                  label: s("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: s("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: Ys,
                    message: s("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(S, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "description",
                  label: s("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Qs, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "status",
                  label: s("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(U, { children: [
                    /* @__PURE__ */ e.jsx(U.Option, { value: "active", children: s("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(U.Option, { value: "disabled", children: s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, tl = ({
  transformItems: l = (t) => t
}) => {
  const { t } = X("system"), i = ke(), s = bs(), d = s.hash.replace("#", "") || "base", { enableMultiOrg: m } = rt(), { hasPermission: r } = ys(), c = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Us, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Ls, {}),
      hidden: !r("system:security:update")
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Ms, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Rs, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Ds, {}),
      hidden: !r("system:settings:update")
    },
    {
      key: "ai-models",
      label: t("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(qs, {}),
      hidden: !r("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: t("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Hs, {}),
      hidden: !r("system:toolsets:view")
    },
    {
      key: "skills",
      label: t("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(Zs, {}),
      hidden: !r("system:skills:view")
    },
    {
      key: "task",
      label: t("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Xs, {}),
      hidden: !r("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...m ? [{
      key: "organizations",
      label: t("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(el, {}),
      hidden: !r("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ae, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    jt,
    {
      defaultActiveKey: d,
      onChange: (u) => {
        i(`${s.pathname}#${u}`);
      },
      items: l(c.filter((u) => !u.hidden), t)
    }
  ) });
}, Bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tl
}, Symbol.toStringTag, { value: "Module" })), sl = () => {
  var Te, Se, Ce;
  const { message: l, modal: t } = ce.useApp(), i = ke(), { id: s } = Ye(), { t: a } = X("system"), { t: n } = X("common"), [d] = o.useForm(), [m] = o.useForm(), [r, c] = b(!1), [u, V] = b(!1), [x, L] = b(null), [w, P] = b(""), [j, M] = b(1), [k, R] = b(10), { data: p, loading: B, refresh: te } = F(
    () => vs({ id: s }),
    {
      ready: !!s,
      onError: (_) => {
        l.error(a("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", _);
      }
    }
  ), { data: Z, loading: Y, refresh: K } = F(
    () => ws({ id: s, current: j, page_size: k, search: w }),
    {
      ready: !!s,
      refreshDeps: [s, j, k, w],
      onError: (_) => {
        l.error(a("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", _);
      }
    }
  ), { data: q, loading: f } = F(
    () => Is({ current: 1, page_size: 1e3 }),
    {
      ready: r
    }
  ), { data: I, loading: $ } = F(
    () => As({ organization_id: s, current: 1, page_size: 1e3 }),
    {
      ready: !!s
    }
  ), { loading: H, run: C } = F(
    (_) => Cs({ id: s }, _),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), c(!1), d.resetFields(), K();
      },
      onError: (_) => {
        l.error((_ == null ? void 0 : _.err) || a("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: A, run: g } = F(
    (_) => Ts({ id: s, user_id: x.id }, _),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), V(!1), m.resetFields(), L(null), K();
      },
      onError: (_) => {
        l.error((_ == null ? void 0 : _.err) || a("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: z } = F(
    (_) => Fs({ id: s, user_id: _ }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), K();
      },
      onError: (_) => {
        l.error((_ == null ? void 0 : _.err) || a("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), Q = () => {
    c(!0), d.resetFields();
  }, G = (_) => {
    var ie;
    L(_), m.setFieldsValue({
      role_ids: ((ie = _.organization_roles) == null ? void 0 : ie.map((xe) => xe.id)) || []
    }), V(!0);
  }, ue = (_) => {
    t.confirm({
      title: a("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: a("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${_.full_name || _.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => z(_.id)
    });
  }, be = () => {
    d.validateFields().then((_) => {
      C(_);
    });
  }, Fe = () => {
    m.validateFields().then((_) => {
      g(_);
    });
  }, Ie = ((Te = q == null ? void 0 : q.data) == null ? void 0 : Te.filter((_) => {
    var ie;
    return !((ie = Z == null ? void 0 : Z.data) != null && ie.some((xe) => xe.id === _.id));
  })) || [], Ae = [
    {
      title: a("settings.organizations.users.username", { defaultValue: "Username" }),
      dataIndex: "username",
      key: "username"
    },
    {
      title: a("settings.organizations.users.email", { defaultValue: "Email" }),
      dataIndex: "email",
      key: "email"
    },
    {
      title: a("settings.organizations.users.fullName", { defaultValue: "Full Name" }),
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: a("settings.organizations.users.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (_) => /* @__PURE__ */ e.jsx(ne, { color: _ === "active" ? "green" : "default", children: _ === "active" ? a("settings.organizations.active", { defaultValue: "Active" }) : _ })
    },
    {
      title: a("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (_, ie) => {
        var xe;
        return /* @__PURE__ */ e.jsx(W, { wrap: !0, children: ((xe = ie.organization_roles) == null ? void 0 : xe.map((y) => /* @__PURE__ */ e.jsx(ne, { children: y.name }, y.id))) || /* @__PURE__ */ e.jsx(ne, { children: "No roles" }) });
      }
    },
    {
      title: n("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (_, ie) => /* @__PURE__ */ e.jsx(
        Ke,
        {
          actions: [
            {
              key: "edit",
              label: a("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Re, {}),
              onClick: async () => G(ie)
            },
            {
              key: "delete",
              label: a("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ee, {}),
              danger: !0,
              onClick: async () => ue(ie)
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
            E,
            {
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              onClick: () => i("/system/settings#organizations"),
              children: n("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            a("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            p == null ? void 0 : p.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: () => {
          te(), K();
        }, children: n("refresh", { defaultValue: "Refresh" }) }),
        loading: B,
        children: /* @__PURE__ */ e.jsxs(oe, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(oe.Item, { label: a("settings.organizations.name", { defaultValue: "Name" }), children: p == null ? void 0 : p.name }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: a("settings.organizations.slug", { defaultValue: "Slug" }), children: (p == null ? void 0 : p.slug) || "-" }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: a("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: (p == null ? void 0 : p.status) === "active" ? "green" : "default", children: (p == null ? void 0 : p.status) === "active" ? a("settings.organizations.active", { defaultValue: "Active" }) : a("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: a("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (p == null ? void 0 : p.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: a("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), onClick: Q, children: a("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            S.Search,
            {
              placeholder: a("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (_) => {
                P(_), M(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Le,
            {
              columns: Ae,
              dataSource: (Z == null ? void 0 : Z.data) || [],
              loading: Y,
              rowKey: "id",
              pagination: {
                current: j,
                pageSize: k,
                total: (Z == null ? void 0 : Z.total) || 0,
                showSizeChanger: !0,
                showTotal: (_) => n("pagination.total", { defaultValue: `Total ${_} items` }),
                onChange: (_, ie) => {
                  M(_), R(ie);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: a("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: r,
        onOk: be,
        onCancel: () => {
          c(!1), d.resetFields();
        },
        confirmLoading: H,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: d, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "user_id",
              label: a("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: a("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                U,
                {
                  showSearch: !0,
                  placeholder: a("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: f,
                  filterOption: (_, ie) => ((ie == null ? void 0 : ie.label) ?? "").toLowerCase().includes(_.toLowerCase()),
                  options: Ie.map((_) => ({
                    label: `${_.full_name || _.username} (${_.email})`,
                    value: _.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "role_ids",
              label: a("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                U,
                {
                  mode: "multiple",
                  placeholder: a("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: $,
                  options: ((Se = I == null ? void 0 : I.data) == null ? void 0 : Se.map((_) => ({
                    label: _.name,
                    value: _.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: a("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: u,
        onOk: Fe,
        onCancel: () => {
          V(!1), m.resetFields(), L(null);
        },
        confirmLoading: A,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: m, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: a("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                S,
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
              label: a("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                U,
                {
                  mode: "multiple",
                  placeholder: a("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: $,
                  options: ((Ce = I == null ? void 0 : I.data) == null ? void 0 : Ce.map((_) => ({
                    label: _.name,
                    value: _.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, Jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sl
}, Symbol.toStringTag, { value: "Module" })), ll = He(() => import("./markdown-viewer.js")), al = At(({ css: l }) => ({
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
})), { TextArea: ft } = S, il = (l) => l.toLowerCase().endsWith(".md");
function zt(l) {
  return l.map((t) => {
    var i;
    return {
      key: t.path,
      title: t.name,
      isLeaf: !t.is_dir,
      icon: t.is_dir ? /* @__PURE__ */ e.jsx(wt, {}) : /* @__PURE__ */ e.jsx(Ct, {}),
      children: (i = t.children) != null && i.length ? zt(t.children) : void 0
    };
  });
}
function tt(l) {
  return l.includes("/") ? l.replace(/\/[^/]+$/, "") : "";
}
const nl = () => {
  const { message: l, modal: t } = ce.useApp(), { styles: i } = al(), { id: s } = Ye(), a = ke(), { t: n } = X("system"), [d, m] = b(null), [r, c] = b(null), [u, V] = b(!1), [x, L] = b(""), [w, P] = b(!1), [j, M] = b([]), [k, R] = b(!1), [p, B] = b(!1), [te, Z] = b(""), [Y] = o.useForm(), [K, q] = b(null), [f, I] = b(null), [$, H] = b(""), [C] = o.useForm(), { data: A } = F(
    () => s ? v.system.getSkill({ id: s }) : Promise.reject(new Error("No id")),
    { refreshDeps: [s], ready: !!s }
  ), { data: g, loading: z, refresh: Q } = F(
    () => s ? v.system.listSkillFilesTree({ id: s }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [s],
      ready: !!s,
      onSuccess: (T) => {
        if (!d) {
          for (const O of T)
            if (!O.is_dir && O.name === "SKILL.md") {
              c(O.path), m(O.path), V(!1);
              return;
            }
          for (const O of T)
            if (!O.is_dir && O.name === "SKILLS.md") {
              c(O.path), m(O.path), V(!1);
              return;
            }
        }
      }
    }
  ), G = !!(A != null && A.is_preset), ue = ve(() => zt(g || []), [g]), be = u && r ? r : d ? tt(d) : "", { loading: Fe } = F(() => !s || !d ? Promise.reject(new Error("No id or selected file")) : v.system.getSkillFile({ id: s, path: d || "" }), {
    refreshDeps: [s, d],
    ready: !!s && !!d,
    onSuccess: (T) => {
      L(T.data);
    },
    onBefore: () => {
      L("");
    },
    onError: () => l.error(n("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), Ie = () => {
    !s || !d || G || v.system.putSkillFile({ id: s, path: d }, x).then(() => {
      l.success(n("settings.skills.editor.saved", { defaultValue: "Saved" })), P(!1);
    }).catch(() => l.error(n("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, Ae = (T, O) => {
    const se = String(O.node.key), ge = !O.node.isLeaf;
    c(se), V(ge), O.node.isLeaf ? m(se) : m(null);
  }, Te = (T) => {
    T.event.preventDefault(), q({
      path: String(T.node.key),
      isDir: !T.node.isLeaf,
      x: T.event.clientX,
      y: T.event.clientY
    });
  }, Se = ye(() => q(null), []), Ce = ye(
    (T) => {
      if (!s || !K || G) return;
      const { path: O, isDir: se } = K;
      switch (Se(), T) {
        case "open":
          m(O), c(O), V(!1);
          break;
        case "rename": {
          const ge = O.includes("/") ? O.split("/").pop() : O;
          I({ path: O, isDir: se }), H(ge), setTimeout(() => C.setFieldsValue({ name: ge }), 0);
          break;
        }
        case "delete":
          t.confirm({
            title: n("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: se ? n("settings.skills.editor.deleteConfirmContentDir", { path: O, defaultValue: `Delete ${O}? This will remove the folder and all its contents.` }) : n("settings.skills.editor.deleteConfirmContent", { path: O, defaultValue: `Delete ${O}?` }),
            onOk: () => v.system.deleteSkillPath({ id: s, path: O }).then(() => {
              l.success(n("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === O && (m(null), L("")), r === O && (c(null), V(!1)), Q();
            }).catch(() => l.error(n("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          c(O), V(se), R(!0);
          break;
        case "newDir":
          c(O), V(se), B(!0);
          break;
      }
    },
    [s, K, Se, Q, d, r, C, n, G]
  ), _ = () => {
    if (!s || !f || G) return;
    const T = (C.getFieldValue("name") ?? $).trim();
    if (!T) {
      l.error(n("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!f.isDir && !/\.(md|txt)$/i.test(T)) {
      l.error(n("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const O = tt(f.path), se = O ? `${O}/${T}` : T;
    if (se === f.path) {
      I(null);
      return;
    }
    v.system.moveSkillPath({ id: s }, { from_path: f.path, to_path: se }).then(() => {
      l.success(n("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === f.path && m(se), r === f.path && c(se), I(null), Q();
    }).catch(() => l.error(n("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, ie = (T) => {
    if (!s || G) return;
    const O = String(T.dragNode.key), se = String(T.dragNode.title);
    let ge;
    if (T.dropToGap) {
      const Ge = tt(String(T.node.key));
      ge = Ge ? `${Ge}/${se}` : se;
    } else
      ge = `${T.node.key}/${se}`;
    ge !== O && v.system.moveSkillPath({ id: s }, { from_path: O, to_path: ge }).then(() => {
      l.success(n("settings.skills.editor.moved", { defaultValue: "Moved" })), d === O && m(ge), r === O && c(ge), Q();
    }).catch(() => l.error(n("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, xe = () => {
    const T = te.trim();
    if (!T || !s || G) return;
    const O = be ? `${be}/${T}` : T;
    if (!/\.(md|txt)$/i.test(T)) {
      l.error(n("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    v.system.putSkillFile({ id: s, path: O }, "").then(() => {
      l.success(n("settings.skills.editor.fileCreated", { defaultValue: "File created" })), R(!1), Z(""), Q(), m(O), L("");
    }).catch(() => l.error(n("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, y = () => {
    var se;
    const T = (se = Y.getFieldValue("name")) == null ? void 0 : se.trim();
    if (!T || !s || G) return;
    const O = be ? `${be}/${T}` : T;
    v.system.createSkillDir({ id: s }, { path: O }).then(() => {
      l.success(n("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), B(!1), Y.resetFields(), Q();
    }).catch(() => l.error(n("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, D = () => {
    const T = r || d;
    !s || !T || G || t.confirm({
      title: n("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: n("settings.skills.editor.deleteConfirmContent", { path: T, defaultValue: `Delete ${T}?` }),
      onOk: () => v.system.deleteSkillPath({ id: s, path: T }).then(() => {
        l.success(n("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === T && (m(null), L("")), r === T && (c(null), V(!1)), Q();
      }).catch(() => l.error(n("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return s ? /* @__PURE__ */ e.jsxs(
    ae,
    {
      title: (A == null ? void 0 : A.name) ?? n("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => a("/system/settings#skills"), children: n("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        G ? /* @__PURE__ */ e.jsx(
          lt,
          {
            type: "info",
            showIcon: !0,
            style: { marginBottom: 12 },
            message: n("settings.skills.editor.presetReadOnly", {
              defaultValue: "This is a built-in skill. Files are read-only; use Preview to view content."
            })
          }
        ) : null,
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(De, {}), disabled: G, onClick: () => R(!0), children: n("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(wt, {}), disabled: G, onClick: () => B(!0), children: n("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            z ? /* @__PURE__ */ e.jsx("div", { children: n("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              $t,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !G,
                expandedKeys: j,
                onExpand: (T) => M(T),
                selectedKeys: r ? [r] : [],
                onSelect: Ae,
                onRightClick: G ? void 0 : Te,
                onDrop: ie,
                className: i.fileTree,
                treeData: ue
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(We, {}), disabled: G || !w, onClick: Ie, children: n("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(E, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ee, {}), disabled: G, onClick: D, children: n("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(je, { spinning: Fe, wrapperClassName: Es(i.editorSpin, "ez-editor-spin"), children: il(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  ft,
                  {
                    value: x,
                    readOnly: G,
                    onChange: (T) => {
                      L(T.target.value), P(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(ll, { content: Ft(x) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                ft,
                {
                  value: x,
                  readOnly: G,
                  onChange: (T) => {
                    L(T.target.value), P(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              ) })
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: n("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        K && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: Se,
              onContextMenu: (T) => T.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: K.x, top: K.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            qt,
            {
              selectable: !1,
              items: [
                ...K.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Ct, {}), label: n("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Re, {}), label: n("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ee, {}), label: n("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(as, {}), label: n("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(is, {}), label: n("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: T }) => Ce(T)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(fe, { title: n("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: k, onOk: xe, onCancel: () => {
          R(!1), Z("");
        }, okText: n("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(S, { placeholder: n("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: te, onChange: (T) => Z(T.target.value) }) }),
        /* @__PURE__ */ e.jsx(fe, { title: n("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: p, onOk: () => Y.validateFields().then(y), onCancel: () => B(!1), okText: n("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(o, { form: Y, layout: "vertical", children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: n("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(S, { placeholder: n("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: n("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!f,
            onOk: _,
            onCancel: () => I(null),
            okText: n("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(o, { form: C, layout: "vertical", onValuesChange: (T, O) => H(O.name ?? ""), children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: f != null && f.isDir ? n("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : n("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              S,
              {
                placeholder: f != null && f.isDir ? n("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : n("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => _()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nl
}, Symbol.toStringTag, { value: "Module" })), ol = He(() => import("./markdown-viewer.js")), rl = () => {
  const { message: l } = ce.useApp(), { id: t } = Ye(), i = ke(), { t: s } = X("system"), { data: a, loading: n } = F(
    () => t ? v.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: d, loading: m, mutate: r } = F(
    () => t ? v.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => l.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => r()
    }
  ), c = ve(() => d == null ? void 0 : d.map((V) => ({
    key: V.file_name,
    label: V.file_name,
    children: /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(ol, { content: Ft(V.content) }) })
  })), [d]);
  if (!t) return null;
  const u = n || m;
  return /* @__PURE__ */ e.jsx(je, { spinning: u, children: /* @__PURE__ */ e.jsx(
    ae,
    {
      title: (a == null ? void 0 : a.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => i("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: c
    }
  ) });
}, Wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rl
}, Symbol.toStringTag, { value: "Module" })), { Text: he, Title: dl } = Vt, it = ["agent", "llm", "tool"], gt = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(ms, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(cs, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(us, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(at, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Ze, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(ds, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Ze, {}) }
}, ht = {
  agent: "#1677ff",
  llm: "#52c41a",
  tool: "#fa8c16"
}, ul = {
  llm_request: "#1677ff",
  llm_response: "#52c41a",
  tool_call: "#fa8c16",
  tool_result: "#13c2c2",
  token_usage: "#722ed1",
  error: "#ff4d4f",
  summary: "#2f54eb"
}, cl = At(({ token: l, css: t }) => ({
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
})), Me = ({
  content: l,
  maxHeight: t
}) => {
  const { parsed: i, isJSON: s } = Ve(l);
  return s ? /* @__PURE__ */ e.jsx(
    Xe,
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
      value: i
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
}, st = "#ff4d4f";
function Ot(l, t) {
  if (!t || !l) return !1;
  if (typeof l.ok == "boolean") return !l.ok;
  const i = (l.result || "").trim();
  return i ? !!(i === "tool call failed" || /^unknown tool:/i.test(i) || /^tool .+ failed:/i.test(i)) : !1;
}
function ml(l) {
  const t = /* @__PURE__ */ new Map();
  for (const i of l) {
    if (i.event_type !== "tool_call") continue;
    const { parsed: s, isJSON: a } = Ve(i.content);
    a && s.tool_call_id && s.tool && t.set(s.tool_call_id, s.tool);
  }
  return t;
}
const pl = ({
  content: l,
  t,
  maxHeight: i
}) => {
  const { parsed: s, isJSON: a } = Ve(l);
  return a ? /* @__PURE__ */ e.jsxs(oe, { size: "small", column: 2, bordered: !0, style: { maxHeight: i, overflow: "auto" }, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      oe.Item,
      {
        label: t("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(Me, { content: l, maxHeight: i });
}, fl = ({
  content: l,
  t,
  maxHeight: i
}) => {
  const { parsed: s, isJSON: a } = Ve(l);
  return a ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: i, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(he, { code: !0, children: s.tool_call_id })
    ] }),
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: i, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Me, { content: s.arguments, maxHeight: i })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Me, { content: l, maxHeight: i });
}, gl = ({
  content: l,
  t,
  maxHeight: i
}) => {
  const { parsed: s, isJSON: a } = Ve(l);
  if (!a) return /* @__PURE__ */ e.jsx(Me, { content: l, maxHeight: i });
  const n = Ot(s, a);
  return /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: i, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(he, { code: !0, children: s.tool_call_id })
    ] }),
    (typeof s.ok == "boolean" || n) && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.status", { defaultValue: "Status" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ne, { color: n ? "error" : "success", children: n ? t("trace.failed", { defaultValue: "Failed" }) : t("trace.succeeded", { defaultValue: "Succeeded" }) })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { style: { overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(he, { strong: !0, children: [
        t("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Me, { content: s.result, maxHeight: i })
    ] })
  ] });
}, xt = ({ event: l, t, maxHeight: i }) => {
  switch (l.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(pl, { content: l.content, t, maxHeight: i });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(fl, { content: l.content, t, maxHeight: i });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(gl, { content: l.content, t, maxHeight: i });
    case "error":
      return /* @__PURE__ */ e.jsx(
        "pre",
        {
          style: {
            background: "var(--ant-color-error-bg)",
            border: "1px solid var(--ant-color-error-border)",
            borderRadius: 6,
            padding: 12,
            maxHeight: i,
            overflow: "auto",
            fontSize: 12,
            color: "var(--ant-color-error)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            margin: 0
          },
          children: l.content
        }
      );
    default:
      return /* @__PURE__ */ e.jsx(Me, { content: l.content, maxHeight: i });
  }
};
function yt(l) {
  return it.indexOf(l);
}
function bt(l, t) {
  return l > 0 ? ` (${t("trace.durationMs", {
    ms: l,
    defaultValue: `${l}ms`
  })})` : "";
}
function hl(l, t) {
  const i = ml(l), s = t("trace.failed", { defaultValue: "Failed" });
  return l.map((a, n) => {
    const d = t(`trace.eventTypes.${a.event_type}`, {
      defaultValue: a.event_type
    }), m = ul[a.event_type] || "#8c8c8c";
    switch (a.event_type) {
      case "llm_request":
        return {
          id: a.id,
          event: a,
          from: "agent",
          to: "llm",
          label: d,
          kind: "call",
          color: m
        };
      case "llm_response":
        return {
          id: a.id,
          event: a,
          from: "llm",
          to: "agent",
          label: `${d}${bt(a.duration_ms, t)}`,
          kind: "return",
          color: m
        };
      case "tool_call": {
        const { parsed: r, isJSON: c } = Ve(a.content), u = c && r.tool ? r.tool : d;
        return {
          id: a.id,
          event: a,
          from: "agent",
          to: "tool",
          label: u,
          kind: "call",
          color: m
        };
      }
      case "tool_result": {
        const { parsed: r, isJSON: c } = Ve(a.content), u = Ot(r, c), V = c && r.tool_call_id && i.get(r.tool_call_id) || "", x = V ? `${d}: ${V}` : d;
        return {
          id: a.id,
          event: a,
          from: "tool",
          to: "agent",
          label: u ? `${x} · ${s}` : x,
          kind: "return",
          color: u ? st : m,
          failed: u
        };
      }
      case "summary":
        return {
          id: a.id,
          event: a,
          from: "agent",
          to: "llm",
          label: d,
          kind: "call",
          color: m
        };
      case "token_usage": {
        const { parsed: r, isJSON: c } = Ve(a.content), u = c && r.total_tokens != null ? ` · ${r.total_tokens}` : "";
        return {
          id: a.id,
          event: a,
          from: "agent",
          to: "agent",
          label: `${d}${u}`,
          kind: "note",
          color: m
        };
      }
      case "error": {
        const r = n > 0 ? l[n - 1] : void 0, c = (r == null ? void 0 : r.event_type) === "llm_request", u = `${d}${bt(a.duration_ms, t)} · ${s}`;
        return c ? {
          id: a.id,
          event: a,
          from: "llm",
          to: "agent",
          label: u,
          kind: "return",
          color: st,
          failed: !0
        } : {
          id: a.id,
          event: a,
          from: "agent",
          to: "agent",
          label: u,
          kind: "note",
          color: st,
          failed: !0
        };
      }
      default:
        return {
          id: a.id,
          event: a,
          from: "agent",
          to: "agent",
          label: d,
          kind: "note",
          color: m
        };
    }
  });
}
const xl = ({ from: l, to: t, label: i, color: s, kind: a, failed: n, styles: d, cx: m }) => {
  const r = yt(l), c = yt(t), u = (Math.min(r, c) + 0.5) * (100 / 3), V = (Math.max(r, c) + 0.5) * (100 / 3), x = V - u, L = c > r, w = a === "return";
  return /* @__PURE__ */ e.jsxs("div", { className: d.arrowTrack, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: d.arrowLine,
        style: {
          left: `${u}%`,
          width: `${x}%`,
          borderTopColor: s,
          borderTopStyle: w ? "dashed" : "solid"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: d.arrowHead,
        style: L ? {
          left: `calc(${V}% - 2px)`,
          borderLeft: `8px solid ${s}`
        } : {
          left: `calc(${u}% - 6px)`,
          borderRight: `8px solid ${s}`
        }
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: m(d.arrowLabel, n && d.arrowLabelFailed),
        style: { color: s, borderColor: s },
        title: i,
        children: [
          n && /* @__PURE__ */ e.jsx(Tt, { className: d.failIcon }),
          /* @__PURE__ */ e.jsx("span", { children: i })
        ]
      }
    )
  ] });
}, yl = ({ events: l, t, selectedId: i, onSelect: s }) => {
  const { styles: a, cx: n } = cl(), d = ve(
    () => hl(l, t),
    [l, t]
  ), m = (r) => t(`trace.actors.${r}`, {
    defaultValue: r === "agent" ? "Agent" : r === "llm" ? "LLM" : "Tool"
  });
  return d.length === 0 ? /* @__PURE__ */ e.jsx(
    Pe,
    {
      description: t("trace.noEvents", {
        defaultValue: "No trace events found for this trace ID"
      })
    }
  ) : /* @__PURE__ */ e.jsx("div", { className: a.sequenceWrap, children: /* @__PURE__ */ e.jsxs("div", { className: a.sequenceInner, children: [
    /* @__PURE__ */ e.jsx("div", { className: a.actorHeader, children: it.map((r) => /* @__PURE__ */ e.jsx(
      "div",
      {
        className: a.actorBox,
        style: { borderColor: ht[r], color: ht[r] },
        children: m(r)
      },
      r
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: a.messageList, children: [
      /* @__PURE__ */ e.jsx("div", { className: a.lifelineBg, children: it.map((r) => /* @__PURE__ */ e.jsx("div", { className: a.lifeline }, r)) }),
      d.map((r) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          role: "button",
          tabIndex: 0,
          className: n(
            a.messageRow,
            i === r.id && a.messageRowActive
          ),
          onClick: () => s(r.event),
          onKeyDown: (c) => {
            (c.key === "Enter" || c.key === " ") && (c.preventDefault(), s(r.event));
          },
          children: [
            /* @__PURE__ */ e.jsxs("span", { className: a.stepMeta, children: [
              "#",
              r.event.step_order
            ] }),
            r.kind === "note" ? /* @__PURE__ */ e.jsxs(
              "div",
              {
                className: n(
                  a.noteBox,
                  r.failed && a.noteBoxFailed
                ),
                style: { borderColor: r.color, color: r.color },
                title: r.label,
                children: [
                  r.failed && /* @__PURE__ */ e.jsx(Tt, { className: a.failIcon }),
                  /* @__PURE__ */ e.jsx("span", { children: r.label })
                ]
              }
            ) : /* @__PURE__ */ e.jsx(
              xl,
              {
                from: r.from,
                to: r.to,
                label: r.label,
                color: r.color,
                kind: r.kind,
                failed: r.failed,
                styles: a,
                cx: n
              }
            )
          ]
        },
        r.id
      ))
    ] })
  ] }) });
}, bl = () => {
  const { message: l, modal: t } = ce.useApp(), { t: i } = X("ai"), s = ke(), [a, n] = b(""), [d, m] = b(""), [r, c] = b("sequence"), [u, V] = b(
    null
  ), {
    data: x,
    loading: L,
    refresh: w
  } = F(() => v.ai.getAiTraceStatus(), {
    onError: () => {
      l.error(
        i("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), P = (x == null ? void 0 : x.enabled) ?? !1, { loading: j, run: M } = F(
    (f) => v.ai.toggleAiTrace({ enabled: f }),
    {
      manual: !0,
      onSuccess: (f, [I]) => {
        l.success(
          I ? i("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : i("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), w(), I || m("");
      },
      onError: () => {
        l.error(
          i("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: k,
    loading: R,
    run: p
  } = F(
    (f) => v.ai.getAiTraceEvents({ trace_id: f }),
    {
      manual: !0,
      onError: () => {
        l.error(
          i("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), B = ye(() => {
    a.trim() && (m(a.trim()), V(null), p(a.trim()));
  }, [a, p]), te = ye(
    (f) => {
      const I = f ? i("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : i("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      t.confirm({
        title: f ? i("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : i("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: I,
        onOk: () => M(f)
      });
    },
    [i, M, t]
  ), Z = ye(async () => {
    if (d)
      try {
        const f = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!f.ok) throw new Error("download failed");
        const I = await f.blob(), $ = window.URL.createObjectURL(I), H = document.createElement("a");
        H.href = $, H.download = `ai-trace-${d}.json`, document.body.appendChild(H), H.click(), window.URL.revokeObjectURL($), document.body.removeChild(H);
      } catch {
        l.error(
          i("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, i]), Y = ve(() => k ?? [], [k]);
  Ne(() => {
    V(null);
  }, [d, r]);
  const K = ve(
    () => Y.map((f) => {
      const I = gt[f.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Ze, {})
      }, $ = i(`trace.eventTypes.${f.event_type}`, {
        defaultValue: f.event_type
      });
      return {
        key: f.id,
        dot: I.icon,
        color: I.color,
        children: /* @__PURE__ */ e.jsx(
          Bt,
          {
            size: "small",
            defaultActiveKey: [f.id],
            items: [
              {
                key: f.id,
                label: /* @__PURE__ */ e.jsxs(W, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ne, { color: I.color, children: $ }),
                  /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    f.step_order
                  ] }),
                  f.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    i("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    f.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(he, { type: "secondary", style: { fontSize: 12 }, children: new Date(f.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(xt, { event: f, t: i, maxHeight: 400 })
              }
            ]
          }
        )
      };
    }),
    [Y, i]
  ), q = u ? gt[u.event_type] : null;
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
              E,
              {
                icon: /* @__PURE__ */ e.jsx(ot, {}),
                onClick: () => s("/system/settings#ai-models"),
                children: i("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(dl, { level: 4, style: { margin: 0 }, children: i("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(W, { children: [
            /* @__PURE__ */ e.jsx(he, { children: P ? i("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : i("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: P,
                loading: L || j,
                onChange: te
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(W.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        S,
        {
          placeholder: i("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: a,
          onChange: (f) => n(f.target.value),
          onPressEnter: B,
          prefix: /* @__PURE__ */ e.jsx(ns, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(E, { type: "primary", onClick: B, loading: R, children: i("trace.search", { defaultValue: "Search" }) }),
      d && Y.length > 0 && /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(os, {}), onClick: Z, children: i("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    R ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(je, { size: "large" }) }) }) : d && Y.length === 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Pe,
      {
        description: i("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : Y.length > 0 ? /* @__PURE__ */ e.jsx(
      ae,
      {
        title: /* @__PURE__ */ e.jsx(
          Ht,
          {
            value: r,
            onChange: (f) => c(f),
            options: [
              {
                label: i("trace.viewSequence", {
                  defaultValue: "Sequence"
                }),
                value: "sequence",
                icon: /* @__PURE__ */ e.jsx(rs, {})
              },
              {
                label: i("trace.viewTimeline", {
                  defaultValue: "Timeline"
                }),
                value: "timeline",
                icon: /* @__PURE__ */ e.jsx(vt, {})
              }
            ]
          }
        ),
        children: r === "sequence" ? /* @__PURE__ */ e.jsx(
          yl,
          {
            events: Y,
            t: i,
            selectedId: u == null ? void 0 : u.id,
            onSelect: V
          }
        ) : /* @__PURE__ */ e.jsx(Jt, { items: K })
      }
    ) : null,
    /* @__PURE__ */ e.jsx(
      Wt,
      {
        title: u ? /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(ne, { color: (q == null ? void 0 : q.color) || "default", children: i(`trace.eventTypes.${u.event_type}`, {
            defaultValue: u.event_type
          }) }),
          /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            "#",
            u.step_order
          ] }),
          u.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            i("trace.duration", { defaultValue: "Duration" }),
            ":",
            " ",
            u.duration_ms,
            "ms"
          ] })
        ] }) : null,
        open: r === "sequence" && !!u,
        onClose: () => V(null),
        width: 560,
        children: u && /* @__PURE__ */ e.jsx(xt, { event: u, t: i })
      }
    )
  ] });
}, Kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bl
}, Symbol.toStringTag, { value: "Module" })), jl = He(() => import("./json-schema-config-form.js")), { Text: Oe, Title: Vl } = Vt, kl = ({
  content: l,
  maxHeight: t = 400
}) => {
  const { parsed: i, isJSON: s } = Ve(l);
  return s ? /* @__PURE__ */ e.jsx(
    Xe,
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
      value: i
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
}, Sl = () => {
  var C;
  const { message: l } = ce.useApp(), { t } = X("system"), { t: i } = X("common"), s = ke(), { id: a } = Ye(), [n, d] = b(void 0), [m, r] = b("schema"), [c, u] = b({}), [V, x] = b("{}"), [L, w] = b(null), [P, j] = b(null), { loading: M, data: k } = F(
    () => v.system.getToolSet({ id: a }),
    {
      ready: !!a,
      onError: () => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: R, data: p } = F(
    () => v.system.getToolSetTools({ id: a }),
    {
      ready: !!a,
      onError: () => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), B = p == null ? void 0 : p.find(
    (A) => {
      var g;
      return ((g = A.function) == null ? void 0 : g.name) === n;
    }
  ), { loading: te, run: Z } = F(
    (A, g) => v.system.callTool({ id: a }, { name: A, parameters: g }),
    {
      manual: !0,
      onSuccess: (A) => {
        w((A == null ? void 0 : A.result) ?? "");
      },
      onError: (A) => {
        var z, Q;
        const g = ((Q = (z = A.response) == null ? void 0 : z.data) == null ? void 0 : Q.message) || A.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        l.error(g), w(null);
      }
    }
  ), Y = ye((A) => {
    d(A), u({}), x("{}"), w(null), j(null);
  }, []), K = ye(() => {
    if (m === "schema")
      x(JSON.stringify(c, null, 2)), r("code");
    else {
      const { parsed: A, isJSON: g } = Ve(V);
      g && (u(A), j(null)), r("schema");
    }
  }, [m, c, V]), q = ye((A) => {
    x(A);
    const { parsed: g, isJSON: z } = Ve(A);
    z ? (u(g), j(null)) : j(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), f = ye(() => {
    if (!n) {
      l.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let A;
    if (m === "code") {
      if (P) {
        l.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      A = V;
    } else
      A = JSON.stringify(c);
    w(null), Z(n, A);
  }, [n, m, c, V, P, Z, t]), I = k, $ = (I == null ? void 0 : I.status) === "enabled" ? "green" : "red", H = (I == null ? void 0 : I.status) === "enabled" ? i("enabled", { defaultValue: "Enabled" }) : i("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(W, { children: [
      /* @__PURE__ */ e.jsx(
        E,
        {
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(Vl, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, loading: M, children: I && /* @__PURE__ */ e.jsxs(oe, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Oe, { strong: !0, children: I.name }) }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(ne, { color: "blue", children: String(I.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: I.description || "-" }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: $, children: H }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Oe, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        R ? /* @__PURE__ */ e.jsx(je, { size: "small" }) : /* @__PURE__ */ e.jsx(
          U,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: n,
            onChange: Y,
            optionLabelProp: "label",
            children: (p ?? []).map((A) => {
              var G, ue;
              const g = ((G = A.function) == null ? void 0 : G.name) ?? "", z = ((ue = A.function) == null ? void 0 : ue.description) ?? "", Q = z ? `${g} - ${z}` : g;
              return /* @__PURE__ */ e.jsx(U.Option, { value: g, label: Q, children: /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: Q,
                  children: Q
                }
              ) }, g);
            })
          }
        )
      ] }),
      B && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(Oe, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            Qe,
            {
              title: m === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  size: "small",
                  icon: m === "schema" ? /* @__PURE__ */ e.jsx(ps, {}) : /* @__PURE__ */ e.jsx(fs, {}),
                  onClick: K
                }
              )
            }
          )
        ] }),
        m === "schema" ? (C = B.function) != null && C.parameters ? /* @__PURE__ */ e.jsx(Je, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(
          jl,
          {
            schema: B.function.parameters,
            value: c,
            onChange: u
          }
        ) }) : /* @__PURE__ */ e.jsx(Oe, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            zs,
            {
              value: V,
              height: "200px",
              extensions: [Os()],
              onChange: q,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          P && /* @__PURE__ */ e.jsx(Oe, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: P })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: L !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        E,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(gs, {}),
          loading: te,
          disabled: !n,
          onClick: f,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      L !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Oe, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(kl, { content: L, maxHeight: 300 })
      ] })
    ] })
  ] });
}, Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sl
}, Symbol.toStringTag, { value: "Module" })), _l = () => {
  const { t: l } = X("system"), [t] = js(), i = t.get("provider"), s = t.get("code"), a = t.get("state"), [n, d] = b(null), [m, r] = b(null), [c, u] = b(null);
  return F(async () => {
    if (!s || !a || !i)
      throw new Error(l("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const V = await v.system.testOauthCallback({ code: s, state: a, provider: i });
    if (!V.user_info)
      throw new Error(l("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!V.user)
      throw new Error(l("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    d(V.user), r(V.user_info);
  }, {
    onSuccess: () => {
      u({
        status: "success",
        message: l("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (V) => {
      u({
        status: "error",
        message: l("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: V.message
      });
    }
  }), c ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    Kt,
    {
      status: c.status,
      title: c.message,
      subTitle: c.error,
      extra: /* @__PURE__ */ e.jsxs(W, { style: { display: !m || !n ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ae, { title: l("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Xe, { value: m || {} }) }),
        /* @__PURE__ */ e.jsx(ae, { title: l("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Xe, { value: n || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Ue, {});
}, Zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _l
}, Symbol.toStringTag, { value: "Module" }));
export {
  Kl as A,
  Jl as O,
  Hl as S,
  Gl as T,
  Wl as a,
  Zl as b,
  Bl as i
};
