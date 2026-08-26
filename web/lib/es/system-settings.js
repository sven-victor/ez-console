import { j as e } from "./vendor.js";
import { App as ce, Form as o, Spin as be, Switch as de, Select as q, Input as v, Alert as it, Divider as rt, Space as K, Button as E, InputNumber as me, Modal as fe, Skeleton as Jt, Descriptions as oe, Steps as Wt, Tag as ne, Table as Me, Radio as qe, Tabs as vt, Popconfirm as Ht, Tooltip as Ye, Card as ae, Row as $e, Col as _e, Checkbox as st, Empty as Re, AutoComplete as ct, Upload as Kt, Tree as Gt, Menu as Zt, Collapse as Xt, Typography as St, Timeline as Qt, Segmented as et, Drawer as Yt, Result as es } from "antd";
import { useTranslation as X } from "react-i18next";
import { useState as x, useEffect as ze, useMemo as je, Suspense as We, lazy as He, useCallback as ye } from "react";
import { useRequest as I } from "ahooks";
import { SaveOutlined as Ke, ReloadOutlined as we, LoadingOutlined as ts, CheckCircleTwoTone as ss, ClearOutlined as ls, StarFilled as as, CheckCircleOutlined as is, StarOutlined as ns, EditOutlined as Ne, CopyOutlined as _t, DeleteOutlined as Ee, BugOutlined as wt, PlusOutlined as Le, ThunderboltOutlined as os, ToolOutlined as nt, SettingOutlined as rs, FileTextOutlined as Xe, EyeOutlined as Ct, UploadOutlined as mt, UnorderedListOutlined as Tt, CalendarOutlined as ds, ArrowLeftOutlined as dt, FolderOutlined as Ft, FileOutlined as It, FileAddOutlined as us, FolderAddOutlined as cs, SearchOutlined as ms, DownloadOutlined as ps, ApartmentOutlined as fs, WarningOutlined as gs, DashboardOutlined as hs, MessageOutlined as xs, SendOutlined as ys, CloseCircleOutlined as At, AlignLeftOutlined as Et, CodeOutlined as zt, PlayCircleOutlined as js } from "@ant-design/icons";
import { a as C } from "./index.js";
import { g as pt, c as Ot, d as Be } from "./base.js";
import { g as pe, d as bs, b as Ge, L as De } from "./components.js";
import Pt from "react-quill-new";
import { b as ut, u as Vs, a as ks } from "./contexts.js";
import { useNavigate as ve, useLocation as vs, useParams as tt, useSearchParams as Ss } from "react-router-dom";
import { l as _s, c as ws, u as Cs, d as Ts, g as Fs, b as Is, e as As, f as Es, r as zs } from "./system.js";
import { l as Os, b as Ps } from "./authorization.js";
import { createStyles as Rt } from "antd-style";
import Rs from "classnames";
import Qe from "@uiw/react-json-view";
import Ms from "@uiw/react-codemirror";
import { json as Ns } from "@codemirror/lang-json";
const Oe = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Ls = {
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
}, Ds = ({ initialData: l, onRefresh: t }) => {
  const { message: a } = ce.useApp(), { t: s } = X("system"), { t: n } = X("common"), [i] = o.useForm(), [r, m] = x((l == null ? void 0 : l.provider) || "custom"), [d, c] = x((l == null ? void 0 : l.provider) === "custom" || (l == null ? void 0 : l.provider) === "autoDiscover"), [u, j] = x((l == null ? void 0 : l.enabled) || !1), [h, N] = x((l == null ? void 0 : l.auto_create_user) || !1), { loading: T, data: R, refresh: b } = I(C.system.getOauthSettings, {
    manual: !!l,
    onSuccess: (S) => {
      i.setFieldsValue(S), m(S.provider), c(S.provider === "custom" || S.provider === "autoDiscover"), j(S.enabled), N(S.auto_create_user);
    },
    onError: (S) => {
      a.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", S);
    }
  });
  ze(() => {
    l && (i.setFieldsValue(l), m(l.provider), c(l.provider === "custom" || l.provider === "autoDiscover"), j(l.enabled), N(l.auto_create_user));
  }, [l, i]);
  const M = (S) => {
    m(S), c(S === "custom" || S === "autoDiscover");
    const _ = Ls[S];
    _ && i.setFieldsValue({
      auth_endpoint: _.endpoints.auth_endpoint,
      token_endpoint: _.endpoints.token_endpoint,
      userinfo_endpoint: _.endpoints.userinfo_endpoint,
      scope: _.scope,
      // Set field mappings
      email_field: _.email_field,
      username_field: _.username_field,
      full_name_field: _.full_name_field,
      avatar_field: _.avatar_field,
      role_field: _.role_field,
      // Set display configuration
      icon_url: _.icon_url,
      display_name: _.display_name
    });
  }, k = (S) => {
    j(S);
  }, D = (S) => {
    N(S);
  }, { loading: p, run: $ } = I(C.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      a.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), t ? t() : b();
    },
    onError: (S) => {
      a.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", S);
    }
  }), te = (S) => {
    $(S);
  }, Z = () => {
    t ? t() : b();
  }, { loading: ee, run: H } = I(async ({ redirect_uri: S, ..._ }) => {
    let z;
    return S ? z = new URL(S) : z = new URL(window.location.origin), z.pathname = pt("/system/settings/oauth/test-callback"), z.searchParams.set("provider", r), C.system.testOauthConnection({ redirect_uri: z.toString(), ..._ });
  }, {
    manual: !0,
    onSuccess: ({ url: S }) => {
      window.open(S, "_blank");
    },
    onError: (S) => {
      a.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: S.message })), console.error("Failed to test OAuth connection", S);
    }
  }), B = () => r === "custom";
  return /* @__PURE__ */ e.jsx(be, { spinning: T, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: te,
      initialValues: l || R,
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
            children: /* @__PURE__ */ e.jsxs(q, { onChange: M, disabled: !u, children: [
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
          o.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              v,
              {
                disabled: !u,
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
                pattern: Oe,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u, placeholder: "https://example.com/icon.png" })
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
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u })
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
            children: /* @__PURE__ */ e.jsx(v.Password, { disabled: !u, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        B() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: u && r === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Oe,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u })
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
                pattern: Oe,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: u && r === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u })
          }
        ),
        B() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: u && r === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Oe,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u })
          }
        ),
        B() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: u && r === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Oe,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u })
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
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(S) => S.getFieldValue("redirect_uri") !== "" ? {
              pattern: Oe,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u, placeholder: `http://${window.location.host}${pt(`/login?provider=settings.${r}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: D, disabled: !u })
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
                required: u && h,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(v, { disabled: !u || !h })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(q, { disabled: !u, children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          it,
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
        /* @__PURE__ */ e.jsx(rt, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          it,
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
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "email", disabled: !u || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "login", autoComplete: "off", disabled: !u || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "name", disabled: !u || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "avatar_url", disabled: !u || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(v, { placeholder: "role", disabled: !u || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              loading: ee,
              onClick: async () => {
                const S = i.getFieldsValue();
                H(S);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: Z,
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Us = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), [s] = o.useForm(), { loading: n, data: i, refresh: r } = I(C.system.getSecuritySettings, {
    onSuccess: (u) => {
      s.setFieldsValue(u);
    },
    onError: (u) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", u);
    }
  }), { loading: m, run: d } = I(C.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), r();
    },
    onError: (u) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", u);
    }
  }), c = (u) => {
    d(u);
  };
  return /* @__PURE__ */ e.jsx(be, { spinning: n, children: /* @__PURE__ */ e.jsxs(
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
            children: /* @__PURE__ */ e.jsxs(q, { children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            shouldUpdate: (u, j) => u.login_failure_lock !== j.login_failure_lock,
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
            shouldUpdate: (u, j) => u.login_failure_lock !== j.login_failure_lock,
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
            shouldUpdate: (u, j) => u.history_password_check !== j.history_password_check,
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
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: m,
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => r(),
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, qs = ({ fetchItems: l, importItems: t, columns: a, ...s }) => {
  const { message: n } = ce.useApp(), { t: i } = X("system"), [r, m] = x([]), [d, c] = x([]), { run: u, loading: j } = I(l, {
    onError: (T) => {
      n.error(i("settings.ldap.importError", { error: `${T.message}` }));
    },
    onSuccess: (T) => {
      m(T);
    },
    manual: !0
  }), { run: h, loading: N } = I(async () => {
    for (const T of d.filter((R) => {
      const b = r.find((M) => M.ldap_dn === R);
      return !(!b || b.status === "imported");
    })) {
      const R = await t([T]);
      m((b) => [...b].map((k) => {
        for (const D of R)
          if (k.ldap_dn === D.ldap_dn)
            return { ...D, status: "imported" };
        return k;
      }));
    }
  }, {
    manual: !0
  });
  return ze(() => {
    s.visible && (m([]), u(), c([]));
  }, [s.visible]), /* @__PURE__ */ e.jsx(
    fe,
    {
      title: i("settings.ldap.importTitle"),
      ...s,
      onOk: () => {
        h();
      },
      width: 900,
      confirmLoading: N,
      loading: j,
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
          columns: a.map(({ render: T, ...R }) => T ? {
            ...R,
            render: (b, M, k) => {
              const D = d.includes(M.ldap_dn) && N && M.status !== "imported";
              return T(b, M, k, D);
            }
          } : R),
          dataSource: r,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, $s = () => {
  var M, k, D;
  const { message: l } = ce.useApp(), { t } = X("system"), [a] = o.useForm(), [s, n] = x(!1), [i, r] = x(null), [m, d] = x(!1), [c, u] = x(!1), [j] = o.useForm(), [h, N] = x(!1);
  I(C.system.getLdapSettings, {
    onSuccess: (p) => {
      a.setFieldsValue(p), N(p.enabled);
    },
    onError: (p) => {
      l.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${p.message}` }));
    }
  }), ze(() => {
    r(null);
  }, [m]);
  const T = async (p) => {
    n(!0);
    try {
      await C.system.updateLdapSettings(p), l.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      l.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      n(!1);
    }
  }, { run: R, loading: b } = I(async (p) => {
    const $ = await a.validateFields();
    return await C.system.testLdapConnection({
      ...p,
      ...$
    });
  }, {
    onSuccess: (p) => {
      r(p);
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (p) => N(p) })
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
          /* @__PURE__ */ e.jsx(rt, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
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
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !h,
                style: { marginLeft: 8 },
                onClick: () => d(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !h,
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
        onCancel: () => d(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            o,
            {
              form: j,
              layout: "vertical",
              onFinish: R,
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
                  /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { disabled: !h, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
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
          /* @__PURE__ */ e.jsx(be, { spinning: b, children: /* @__PURE__ */ e.jsx(Jt, { active: b, loading: b, children: i && (i.user ? /* @__PURE__ */ e.jsxs(oe, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(oe.Item, { label: "Username", span: 3, children: i.user.username }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "Email", span: 3, children: i.user.email }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "FullName", span: 3, children: i.user.full_name }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "CreatedAt", span: 3, children: i.user.created_at }),
            /* @__PURE__ */ e.jsx(oe.Item, { label: "UpdatedAt", span: 3, children: i.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            Wt,
            {
              direction: "vertical",
              current: (M = i.message) == null ? void 0 : M.findIndex((p) => !p.success),
              status: (k = i.message) != null && k.find((p) => !p.success) ? "error" : "finish",
              items: (D = i.message) == null ? void 0 : D.map((p) => ({
                status: p.success ? "finish" : "error",
                title: p.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      qs,
      {
        visible: c,
        onCancel: () => u(!1),
        fetchItems: () => C.system.importLdapUsers({}),
        importItems: (p) => C.system.importLdapUsers({ user_dn: p }),
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
          render: (p, $, te, Z) => Z ? /* @__PURE__ */ e.jsx(be, { indicator: /* @__PURE__ */ e.jsx(ts, { spin: !0 }) }) : p ? /* @__PURE__ */ e.jsx(ss, { twoToneColor: "#52c41a" }) : $.id ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ne, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Bs = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), [s] = o.useForm(), [n, i] = x(null), [r, m] = x(!1), [d] = o.useForm(), [c, u] = x(!1), { data: j } = I(C.system.getSmtpSettingFields), { loading: h } = I(C.system.getSmtpSettings, {
    onSuccess: (k) => {
      s.setFieldsValue(k), u(k.enabled);
    },
    onError: (k) => {
      l.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${k.message}` }));
    }
  });
  ze(() => {
    i(null);
  }, [r]);
  const { run: N, loading: T } = I(({ port: k, ...D }) => C.system.updateSmtpSettings({ ...D, port: Number(k) }), {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (k) => {
      l.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${k.message}` }));
    }
  }), { run: R, loading: b } = I(async (k) => {
    const { port: D, ...p } = await s.validateFields();
    return await C.system.testSmtpConnection({
      ...k,
      ...p,
      port: Number(D)
    });
  }, {
    onSuccess: (k) => {
      i(k);
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
        return /* @__PURE__ */ e.jsx(q, { mode: "tags", tokenSeparators: [","], disabled: !c });
      case "enum":
        return /* @__PURE__ */ e.jsx(q, { disabled: !c, options: k.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Pt, { theme: "snow", readOnly: !c });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(v, { disabled: !c });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(be, { spinning: h, children: /* @__PURE__ */ e.jsxs(
      o,
      {
        form: s,
        layout: "vertical",
        onFinish: N,
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
                q,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !c,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(rt, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (j || []).map((k) => /* @__PURE__ */ e.jsx(
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
            /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: T, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              E,
              {
                onClick: () => m(!0),
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
      fe,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: r,
        onCancel: () => m(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => m(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(E, { type: "primary", loading: b, onClick: () => d.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: d,
            layout: "vertical",
            onFinish: (k) => R(k),
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
}, Js = () => {
  const { message: l } = ce.useApp(), { t, i18n: a } = X("system"), { t: s } = X("common"), [n] = o.useForm(), { fetchSiteConfig: i, currentOrgId: r } = ut(), { user: m } = Vs(), d = o.useWatch("enable_multi_org", n), c = o.useWatch("default_organization_id", n), u = je(() => {
    var $;
    const p = ($ = m == null ? void 0 : m.organizations) == null ? void 0 : $.find((te) => te.id === r);
    return p != null && p.name ? `${p.name} (${r})` : r || "";
  }, [m == null ? void 0 : m.organizations, r]), j = je(() => {
    var $;
    const p = ($ = m == null ? void 0 : m.organizations) == null ? void 0 : $.find((te) => te.id === c);
    return p != null && p.name ? `${p.name} (${c})` : c || "";
  }, [m == null ? void 0 : m.organizations, c]), { loading: h, data: N, refresh: T } = I(C.system.getSystemBaseSettings, {
    onSuccess: (p) => {
      n.setFieldsValue(p);
    },
    onError: (p) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", p);
    }
  }), { loading: R, run: b } = I(C.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: async () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), T(), await i();
    },
    onError: (p) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", p);
    }
  }), { loading: M, run: k } = I(C.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      l.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (p) => {
      l.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", p);
    }
  }), D = (p) => {
    b(p);
  };
  return /* @__PURE__ */ e.jsx(be, { spinning: h, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: n,
      layout: "vertical",
      onFinish: D,
      initialValues: N,
      children: [
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(vt, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", children: /* @__PURE__ */ e.jsx(v, {}) }) })
        }, ...bs.map((p) => ({
          key: p.lang,
          label: a.language !== p.lang ? s(`language.${p.lang}`, { defaultValue: p.label, lang: p.label }) : p.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: ["name_i18n", p.lang], children: /* @__PURE__ */ e.jsx(v, {}) }) })
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
            children: /* @__PURE__ */ e.jsx(v, { value: j, disabled: !0 })
          }
        ),
        d && u && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.currentOrganization", { defaultValue: "Current Organization" }),
            tooltip: t("settings.base.currentOrganizationTooltip", {
              defaultValue: "If you disable multi-organization, this organization will become the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(v, { value: u, disabled: !0 })
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
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: R,
              icon: /* @__PURE__ */ e.jsx(Ke, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => T(),
              icon: /* @__PURE__ */ e.jsx(we, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Ht,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => k(),
              children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ls, {}), loading: M, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, Ws = He(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: ft } = v, Hs = () => {
  var A;
  const { message: l } = ce.useApp(), { t } = X("ai"), { t: a } = X("common"), s = ve(), [n] = o.useForm(), [i, r] = x(!1), [m, d] = x(null), [c, u] = x(""), [j, h] = x(""), { loading: N, data: T } = I(
    () => C.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (f) => {
        l.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", f);
      }
    }
  ), R = je(() => T == null ? void 0 : T.find((f) => f.provider === j), [T, j]), { loading: b, data: M, refresh: k } = I(
    () => C.ai.listAiModels({ current: 1, page_size: 100, search: c }),
    {
      refreshDeps: [c],
      onError: (f) => {
        l.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", f);
      }
    }
  ), { loading: D, run: p } = I(
    ({ config: f, ...O }) => C.ai.createAiModel({ config: f ?? {}, ...O }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), r(!1), n.resetFields(), k();
      },
      onError: (f) => {
        l.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", f);
      }
    }
  ), { loading: $, run: te } = I(
    ({ id: f, data: O }) => C.ai.updateAiModel({ id: f }, O),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), r(!1), n.resetFields(), d(null), k();
      },
      onError: (f) => {
        l.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", f);
      }
    }
  ), { runAsync: Z } = I(
    (f) => C.ai.deleteAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), k();
      },
      onError: (f) => {
        l.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", f);
      }
    }
  ), { runAsync: ee } = I(
    (f) => C.ai.testAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (f) => {
        l.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", f);
      }
    }
  ), { runAsync: H } = I(
    (f) => C.ai.setDefaultAiModel({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), k();
      },
      onError: (f) => {
        l.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", f);
      }
    }
  ), B = () => {
    d(null), h(""), n.resetFields(), r(!0);
  }, S = (f) => {
    d(f), h(f.provider);
    const O = f.config || {}, Q = {
      name: f.name,
      description: f.description,
      provider: f.provider,
      is_default: f.is_default,
      config: O,
      // Spread config fields to form
      status: f.status,
      system_prompt: f.system_prompt ?? "",
      max_chat_tokens: f.max_chat_tokens ?? 0,
      max_chat_iterations: f.max_chat_iterations ?? 0
    };
    n.setFieldsValue(Q), r(!0);
  }, _ = async (f) => {
    d(null), h(f.provider), n.resetFields();
    try {
      const O = await C.ai.getAiModel({ id: f.id }), Q = { ...O.config || {} };
      "api_key" in Q && (Q.api_key = ""), n.setFieldsValue({
        name: `${O.name} (copy)`,
        description: O.description,
        provider: O.provider,
        config: Q,
        is_default: !1,
        status: "enabled",
        system_prompt: O.system_prompt ?? "",
        max_chat_tokens: O.max_chat_tokens ?? 0,
        max_chat_iterations: O.max_chat_iterations ?? 0
      }), r(!0);
    } catch {
      l.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, z = (f) => {
    h(f), n.setFieldValue("config", void 0);
  }, J = (f) => {
    const O = f.config ?? {}, Q = {
      name: f.name,
      description: f.description,
      provider: f.provider,
      config: O,
      is_default: f.is_default,
      status: f.status,
      system_prompt: f.system_prompt ?? "",
      max_chat_tokens: f.max_chat_tokens ?? 0,
      max_chat_iterations: f.max_chat_iterations ?? 0
    };
    m ? te({ id: m.id, data: Q }) : p(Q);
  }, V = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (f, O) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: f }),
        O.is_default && /* @__PURE__ */ e.jsx(Ye, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(as, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (f) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: f.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (f) => /* @__PURE__ */ e.jsx(ne, { color: f === "enabled" ? "green" : "red", children: f === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (f, O) => /* @__PURE__ */ e.jsx(Ge, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(is, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => ee(O.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(ns, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => H(O.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => S(O)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(_t, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => _(O)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => Z(O.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs($e, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsx(
        v.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (f) => u(f),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(wt, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(we, {}),
            onClick: k,
            loading: b,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Le, {}),
            onClick: B,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: V,
        dataSource: (M == null ? void 0 : M.data) || [],
        loading: b,
        rowKey: "id",
        pagination: {
          total: (M == null ? void 0 : M.total) || 0,
          current: (M == null ? void 0 : M.current) || 1,
          pageSize: (M == null ? void 0 : M.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (f, O) => a("pagination.total", {
            defaultValue: `${O[0]}-${O[1]} of ${f} items`,
            start: O[0],
            end: O[1],
            total: f
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: m ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: i,
        onCancel: () => {
          r(!1), n.resetFields(), d(null);
        },
        footer: null,
        width: ((A = R == null ? void 0 : R.ui_schema) == null ? void 0 : A["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: J,
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
                      ft,
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
                      q,
                      {
                        loading: N,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: z,
                        value: j,
                        options: T == null ? void 0 : T.map((f) => ({
                          label: f.name,
                          value: f.provider
                        }))
                      }
                    )
                  }
                ),
                R && /* @__PURE__ */ e.jsx(o.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
                  Ws,
                  {
                    name: "config",
                    schema: R.config_schema,
                    uiSchema: R.ui_schema
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
                      ft,
                      {
                        rows: 4,
                        placeholder: t("models.systemPromptPlaceholder", {
                          defaultValue: "Enter system prompt (optional)"
                        })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsxs($e, { gutter: 16, children: [
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
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(v, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: D || $,
                    children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      r(!1), n.resetFields(), d(null), h("");
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
}, Ks = He(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: Gs } = v, Zs = () => {
  var xe;
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), s = ve(), [n] = o.useForm(), [i, r] = x(!1), [m, d] = x(null), [c, u] = x(""), [j, h] = x(!1), [N, T] = x(null), [R, b] = x(""), [M, k] = x(!1), [D, p] = x([]), [$, te] = x(), [Z, ee] = x(null), { loading: H, data: B, refresh: S } = I(
    () => C.system.listToolSets({ current: 1, page_size: 100, search: c, type: $ }),
    {
      refreshDeps: [c, $],
      onError: (y) => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", y);
      }
    }
  ), { loading: _, data: z } = I(
    () => C.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (y) => {
        l.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", y);
      }
    }
  ), J = je(() => z == null ? void 0 : z.find((y) => y.tool_set_type === R), [z, R]), { loading: V, run: A } = I(
    (y) => C.system.createToolSet({
      ...y,
      type: y.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), r(!1), n.resetFields(), S();
      },
      onError: (y) => {
        l.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", y);
      }
    }
  ), { loading: f, run: O } = I(
    ({ id: y, data: U }) => C.system.updateToolSet({ id: y }, {
      ...U,
      type: U.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), r(!1), n.resetFields(), d(null), S();
      },
      onError: (y) => {
        l.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", y);
      }
    }
  ), { run: Q } = I(
    (y) => C.system.deleteToolSet({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), S();
      },
      onError: (y) => {
        l.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", y);
      }
    }
  ), { runAsync: G } = I(
    (y) => C.system.testToolSet({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (y) => {
        l.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", y);
      }
    }
  ), { loading: ue, runAsync: Ve } = I(
    (y) => C.system.getToolSetTools({ id: y }),
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
    async (y, U) => {
      ee(y.id);
      try {
        await C.system.updateToolSetStatus(
          { id: y.id },
          { status: U ? "enabled" : "disabled" }
        ), l.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), S();
      } catch (F) {
        l.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", F);
      } finally {
        ee(null);
      }
    },
    [t, S]
  ), Ie = () => {
    d(null), n.resetFields(), b(""), r(!0);
  }, Ae = (y) => {
    d(y), b(y.type);
    const U = { ...y };
    n.setFieldsValue(U), r(!0);
  }, Te = (y) => {
    b(y), n.setFieldValue("config", {});
  }, Se = (y) => {
    m ? O({ id: m.id, data: y }) : A(y);
  }, Ce = (y) => {
    Q(y);
  }, w = (y) => {
    T(y), h(!0);
  }, ie = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (y, U) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: y }),
        U.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
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
      render: (y, U) => {
        const F = U.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: F ? "green" : "red", children: F ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ye,
              {
                title: F ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: F,
                    loading: Z === U.id,
                    onChange: (P) => void Fe(U, P)
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
      render: (y, U) => /* @__PURE__ */ e.jsx(Ge, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(wt, {}),
          disabled: U.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${U.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(os, {}),
          disabled: U.status !== "enabled",
          onClick: async () => G(U.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(nt, {}),
          permission: "system:toolsets:view",
          disabled: U.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Ve(U.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(rs, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => w(U.config),
          disabled: !U.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: U.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          onClick: async () => Ae(U),
          disabled: !!U.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ee, {}),
          permission: "system:toolsets:delete",
          tooltip: U.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : a("delete", { defaultValue: "Delete" }),
          onClick: async () => Ce(U.id),
          danger: !0,
          disabled: !!U.is_preset,
          confirm: U.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => Ce(U.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs($e, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          v.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (y) => u(y),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          q,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: $,
            onChange: (y) => te(y),
            options: z == null ? void 0 : z.map((y) => ({
              label: y.name,
              value: y.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "", children: "All" }),
              z == null ? void 0 : z.map((y) => /* @__PURE__ */ e.jsx(q.Option, { value: y.tool_set_type, children: y.name }, y.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(we, {}),
            onClick: S,
            loading: H,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Le, {}),
            onClick: Ie,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: ie,
        dataSource: (B == null ? void 0 : B.data) || [],
        loading: H,
        rowKey: "id",
        pagination: {
          total: (B == null ? void 0 : B.total) || 0,
          current: (B == null ? void 0 : B.current) || 1,
          pageSize: (B == null ? void 0 : B.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (y, U) => a("pagination.total", {
            defaultValue: `${U[0]}-${U[1]} of ${y} items`,
            start: U[0],
            end: U[1],
            total: y
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: m ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          r(!1), n.resetFields(), d(null), b("");
        },
        footer: null,
        width: ((xe = J == null ? void 0 : J.ui_schema) == null ? void 0 : xe["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
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
                    children: /* @__PURE__ */ e.jsx(v, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("settings.toolsets.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      Gs,
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
                      q,
                      {
                        loading: _,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: Te,
                        value: R,
                        options: z == null ? void 0 : z.map((y) => ({
                          label: y.name,
                          value: y.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
                  Ks,
                  {
                    name: "config",
                    schema: J == null ? void 0 : J.config_schema,
                    uiSchema: J == null ? void 0 : J.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(v, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: V || f,
                    children: m ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      r(!1), n.resetFields(), d(null), b("");
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
      fe,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: j,
        onCancel: () => h(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => h(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(N, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: M,
        onCancel: () => k(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => k(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ue ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(we, { style: { fontSize: 24 }, spin: !0 }) }) : D.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : D.map((y, U) => {
          var F, P, se;
          return /* @__PURE__ */ e.jsx(
            ae,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(nt, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((F = y.function) == null ? void 0 : F.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs($e, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(_e, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((P = y.function) == null ? void 0 : P.description) || "-" })
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
            U
          );
        }) })
      }
    )
  ] });
}, { TextArea: gt } = v;
function Xs(l, t) {
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
function Qs(l, t) {
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
function Mt(l, t) {
  const a = t.trim();
  return !a || l.some((s) => s.value === a) ? l : [...l, { value: a, label: a }];
}
function Ys(l, t, a, s) {
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
  return Mt(i, a);
}
const el = () => {
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), s = ve(), { enableSkillToolBinding: n } = ut(), [i] = o.useForm(), [r, m] = x(""), [d, c] = x(), [u, j] = x("user"), [h, N] = x(!1), [T, R] = x(null), [b, M] = x(null), [k, D] = x(!1), [p] = o.useForm(), [$, te] = x(!1), [Z, ee] = x(null), [H, B] = x([]), [S, _] = x({}), [z, J] = x([]), [V, A] = x(!1), f = je(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...H.map((g) => ({
      value: g.id,
      label: `${g.name} (${g.id})`
    }))
  ], [H, t]), O = ye(() => {
    B([]), _({}), J([]);
  }, []), { loading: Q, data: G, refresh: ue } = I(
    () => C.system.listSkills({
      current: 1,
      page_size: 100,
      search: r || void 0,
      domain: d,
      is_preset: u === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [r, d, u],
      onError: () => {
        l.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Ve = [] } = I(() => C.system.listSkillDomains()), Fe = (G == null ? void 0 : G.data) || [], Ie = (G == null ? void 0 : G.total) || 0, { run: Ae } = I(
    (g) => C.system.deleteSkill({ id: g }),
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
    async (g, L) => {
      ee(g.id);
      try {
        await C.system.updateSkillStatus({ id: g.id }, { status: L ? "enabled" : "disabled" }), l.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ue();
      } catch {
        l.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        ee(null);
      }
    },
    [t, ue]
  ), { loading: Se, run: Ce } = I(
    (g) => C.system.uploadSkill(g.body, g.file),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), D(!1), p.resetFields(), ue();
      },
      onError: () => {
        l.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), w = ye(
    async (g) => {
      var L;
      A(!0);
      try {
        const [W, re] = await Promise.all([
          C.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          C.system.listSkillAiToolBindings(
            { id: g, current: 1, page_size: 1e3 }
          )
        ]), Y = ((L = W.data) == null ? void 0 : L.filter((Bt) => Bt.status === "enabled")) || [];
        B(Y);
        const { selections: le, extraPatterns: Ue } = Xs(re.data || [], Y);
        _(le), J(Ue);
      } catch {
        l.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), O();
      } finally {
        A(!1);
      }
    },
    [O, t]
  );
  ze(() => {
    !h || !(T != null && T.id) || !n || w(T.id);
  }, [h, T == null ? void 0 : T.id, n, w]);
  const ie = (g, L) => {
    _((W) => ({ ...W, [g]: L }));
  }, xe = (g, L, W) => {
    _((re) => ({
      ...re,
      [g]: W ? [...L] : []
    }));
  }, y = () => {
    R(null), M(null), i.resetFields(), O(), N(!0);
  }, U = (g) => {
    R(g), M(null), i.setFieldsValue({
      name: g.name,
      description: g.description,
      category: g.category,
      domain: g.domain
    }), O(), N(!0);
  }, F = (g) => {
    R(null), M(g), i.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: g.name, defaultValue: "{{name}} (copy)" }),
      description: g.description,
      category: g.category,
      domain: g.domain
    }), O(), N(!0);
  }, P = () => {
    i.validateFields().then(async (g) => {
      te(!0);
      try {
        if (T) {
          const L = {
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? ""
          };
          if (await C.system.updateSkill({ id: T.id }, L), n) {
            const W = Qs(S, z);
            await C.system.replaceSkillAiToolBindings(
              { id: T.id },
              { bindings: W }
            );
          }
          l.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (b) {
          const L = {
            source_id: b.id,
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? ""
          }, { id: W } = await C.system.cloneSkill(L);
          l.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), N(!1), M(null), i.resetFields(), O(), ue(), W && s(`/system/settings/skills/${W}/edit`);
          return;
        } else {
          const L = {
            name: g.name,
            description: g.description ?? "",
            category: g.category ?? "",
            domain: g.domain ?? "",
            content: g.content ?? ""
          };
          await C.system.createSkill(L), l.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        N(!1), R(null), M(null), i.resetFields(), O(), ue();
      } catch {
        l.error(
          T ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : b ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        te(!1);
      }
    });
  }, se = () => {
    var Y, le;
    const g = (Y = p.getFieldValue("file")) == null ? void 0 : Y.fileList, L = ((le = g == null ? void 0 : g[0]) == null ? void 0 : le.originFileObj) ?? (g == null ? void 0 : g[0]);
    if (!L) {
      l.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const W = p.getFieldValue("category"), re = p.getFieldValue("domain");
    Ce({ body: { category: W, domain: re }, file: L });
  }, ge = n && T, Ze = ge ? 720 : 560, qt = !T && !b, $t = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (g, L) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: g }),
        L.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (g) => g ? /* @__PURE__ */ e.jsx(ne, { children: g }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (g) => g ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: g }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (g, L) => {
        const W = L.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: W ? "green" : "red", children: W ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              Ye,
              {
                title: W ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: W,
                    loading: Z === L.id,
                    onChange: (re) => void Te(L, re)
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
      render: (g, L) => /* @__PURE__ */ e.jsx(
        Ge,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Xe, {}),
              tooltip: L.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${L.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!L.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ct, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${L.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              tooltip: L.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => U(L),
              permission: "system:skills:update",
              disabled: !!L.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(_t, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => F(L),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ee, {}),
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
                okText: a("confirm", { defaultValue: "Confirm" }),
                cancelText: a("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => Ae(L.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs($e, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(K, { children: [
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
          q,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: d,
            onChange: c,
            options: Ve.map((g) => ({ value: g, label: g }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          qe.Group,
          {
            optionType: "button",
            value: u,
            onChange: (g) => j(g.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: () => ue(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: y, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(mt, {}), onClick: () => D(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsx(
        Me,
        {
          rowKey: "id",
          loading: Q,
          columns: $t,
          dataSource: Fe,
          pagination: { total: Ie, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          title: T ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : b ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: h,
          onOk: P,
          onCancel: () => {
            N(!1), R(null), M(null), O();
          },
          confirmLoading: $,
          width: Ze,
          children: /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(gt, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: Ve.map((g) => ({ value: g, label: g })) }) }),
            qt && /* @__PURE__ */ e.jsx(o.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(gt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            ge && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(be, { spinning: V, children: H.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(K, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: H.map((g) => {
                const L = (g.tools || []).map((le) => le.name), W = S[g.id] || [], re = L.length > 0 && W.length === L.length, Y = W.length > 0 && W.length < L.length;
                return /* @__PURE__ */ e.jsx(
                  ae,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        st,
                        {
                          checked: re,
                          indeterminate: Y,
                          onChange: (le) => xe(g.id, L, le.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: g.name })
                    ] }),
                    extra: g.description ? /* @__PURE__ */ e.jsx("span", { children: g.description }) : void 0,
                    children: (g.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(st.Group, { style: { width: "100%" }, value: W, onChange: (le) => ie(g.id, le), children: /* @__PURE__ */ e.jsx(K, { direction: "vertical", style: { width: "100%" }, children: (g.tools || []).map((le) => /* @__PURE__ */ e.jsx(st, { value: le.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: le.name }),
                      le.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: le.description })
                    ] }) }, le.name)) }) }) : /* @__PURE__ */ e.jsx(
                      Re,
                      {
                        image: Re.PRESENTED_IMAGE_SIMPLE,
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
                /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, children: [
                  z.map((g, L) => /* @__PURE__ */ e.jsxs(
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
                          ct,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: g.toolset_id,
                            options: Mt(f, g.toolset_id),
                            filterOption: (W, re) => {
                              const Y = re;
                              return `${(Y == null ? void 0 : Y.value) ?? ""} ${(Y == null ? void 0 : Y.label) ?? ""}`.toLowerCase().includes(W.toLowerCase());
                            },
                            onChange: (W) => {
                              const re = typeof W == "string" ? W : "";
                              J(
                                (Y) => Y.map((le, Ue) => Ue === L ? { ...le, toolset_id: re } : le)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          ct,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: g.tool_name,
                            options: Ys(
                              H,
                              g.toolset_id,
                              g.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (W, re) => {
                              const Y = re;
                              return `${(Y == null ? void 0 : Y.value) ?? ""} ${(Y == null ? void 0 : Y.label) ?? ""}`.toLowerCase().includes(W.toLowerCase());
                            },
                            onChange: (W) => {
                              const re = typeof W == "string" ? W : "";
                              J(
                                (Y) => Y.map((le, Ue) => Ue === L ? { ...le, tool_name: re } : le)
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
                            onClick: () => J((W) => W.filter((re, Y) => Y !== L)),
                            children: a("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    L
                  )),
                  /* @__PURE__ */ e.jsx(E, { type: "dashed", onClick: () => J((g) => [...g, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
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
        fe,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: k,
          onOk: se,
          onCancel: () => D(!1),
          confirmLoading: Se,
          children: /* @__PURE__ */ e.jsxs(o, { form: p, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(Kt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(mt, {}), children: a("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(v, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: Ve.map((g) => ({ value: g, label: g })) }) })
          ] })
        }
      )
    ] })
  ] });
}, tl = () => {
  const { message: l } = ce.useApp(), t = ve(), { t: a } = X("system"), { t: s } = X("task"), { t: n } = X("common"), [i] = o.useForm(), { data: r } = I(C.system.listLogStorageBackends), { data: m } = I(C.system.getTaskSettingFields), d = (r ?? []).map((b) => ({
    value: b.id,
    label: a(`settings.task.logStorage.${b.id}`, { defaultValue: b.name })
  })), { loading: c, refresh: u } = I(C.system.getTaskSettings, {
    onSuccess: (b) => {
      b && i.setFieldsValue(b);
    },
    onError: () => {
      l.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: j, run: h } = I(C.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      l.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), u();
    },
    onError: () => {
      l.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), N = (b) => {
    h(b);
  }, T = (b) => {
    switch (b.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          me,
          {
            style: { width: "100%" },
            addonAfter: b.key.includes("retention_days") ? a("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(me, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx(q, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx(q, { options: b.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Pt, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(v, {});
    }
  }, R = (b) => b.value_type === "int" || b.value_type === "number" || b.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(be, { spinning: c, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: N,
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
              q,
              {
                options: d,
                placeholder: a("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: r === void 0
              }
            )
          }
        ),
        (m ?? []).map((b) => /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: b.key,
            label: a(`settings.task.fields.${b.key}`, { defaultValue: b.key }),
            rules: R(b),
            valuePropName: b.value_type === "bool" ? "checked" : "value",
            children: T(b)
          },
          b.key
        )),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: j, icon: /* @__PURE__ */ e.jsx(Ke, {}), children: n("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(E, { onClick: () => u(), icon: /* @__PURE__ */ e.jsx(we, {}), children: n("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Tt, {}), onClick: () => t("/tasks"), children: s("listTitle", { defaultValue: "Task List" }) }),
          /* @__PURE__ */ e.jsx(pe, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ds, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: sl } = v, ll = /^[-_a-zA-Z0-9.]+$/, al = () => {
  const { message: l, modal: t } = ce.useApp(), a = ve(), { t: s, i18n: n } = X("system"), { t: i } = X("common"), r = (V) => {
    if (!V) return "-";
    const A = new Date(V);
    return Number.isNaN(A.getTime()) ? "-" : A.toLocaleString(n.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [m] = o.useForm(), [d, c] = x(!1), [u, j] = x(null), [h, N] = x(""), [T, R] = x(1), [b, M] = x(10), { loading: k, data: D, refresh: p } = I(
    () => _s({ current: T, page_size: b, search: h }),
    {
      refreshDeps: [T, b, h],
      onError: (V) => {
        l.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", V);
      }
    }
  ), { loading: $, run: te } = I(
    (V) => ws(V),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), c(!1), m.resetFields(), j(null), p();
      },
      onError: (V) => {
        l.error((V == null ? void 0 : V.err) || s("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: Z, run: ee } = I(
    ({ id: V, ...A }) => Cs({ id: V }, A),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), c(!1), m.resetFields(), j(null), p();
      },
      onError: (V) => {
        l.error((V == null ? void 0 : V.err) || s("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: H } = I(
    (V) => Ts({ id: V }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), p();
      },
      onError: (V) => {
        l.error((V == null ? void 0 : V.err) || s("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), B = () => {
    j(null), m.resetFields(), m.setFieldsValue({ status: "active" }), c(!0);
  }, S = (V) => {
    j(V), m.setFieldsValue({
      name: V.name,
      slug: V.slug,
      description: V.description,
      status: V.status
    }), c(!0);
  }, _ = (V) => {
    t.confirm({
      title: s("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: s("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${V.name}"? This action cannot be undone.`
      }),
      onOk: () => H(V.id)
    });
  }, z = () => {
    m.validateFields().then((V) => {
      u ? ee({ id: u.id, ...V }) : te(V);
    });
  }, J = [
    {
      title: s("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: s("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (V) => V || "-"
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
      render: (V) => /* @__PURE__ */ e.jsx(ne, { color: V === "active" ? "green" : "default", children: V === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (V) => r(V)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (V, A) => /* @__PURE__ */ e.jsx(
        Ge,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ct, {}),
              onClick: async () => a(`/system/settings/organizations/${A.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              onClick: async () => S(A),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ee, {}),
              danger: !0,
              onClick: async () => _(A),
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
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: p, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: B, children: s("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            v.Search,
            {
              placeholder: s("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (V) => {
                N(V), R(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: J,
              dataSource: (D == null ? void 0 : D.data) || [],
              loading: k,
              rowKey: "id",
              pagination: {
                current: T,
                pageSize: b,
                total: (D == null ? void 0 : D.total) || 0,
                showSizeChanger: !0,
                showTotal: (V, A) => i("pagination.total", {
                  defaultValue: `${A[0]}-${A[1]} of ${V} items`,
                  start: A[0],
                  end: A[1],
                  total: V
                }),
                onChange: (V, A) => {
                  R(V), M(A);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: u ? s("settings.organizations.edit", { defaultValue: "Edit Organization" }) : s("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: d,
            onOk: z,
            onCancel: () => {
              c(!1), m.resetFields(), j(null);
            },
            confirmLoading: $ || Z,
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
                    pattern: ll,
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
                  children: /* @__PURE__ */ e.jsx(sl, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "status",
                  label: s("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(q, { children: [
                    /* @__PURE__ */ e.jsx(q.Option, { value: "active", children: s("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, il = ({
  transformItems: l = (t) => t
}) => {
  const { t } = X("system"), a = ve(), s = vs(), r = s.hash.replace("#", "") || "base", { enableMultiOrg: m } = ut(), { hasPermission: d } = ks(), c = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Js, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Us, {}),
      hidden: !d("system:security:update")
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Ds, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx($s, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Bs, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ai-models",
      label: t("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Hs, {}),
      hidden: !d("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: t("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Zs, {}),
      hidden: !d("system:toolsets:view")
    },
    {
      key: "skills",
      label: t("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(el, {}),
      hidden: !d("system:skills:view")
    },
    {
      key: "task",
      label: t("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(tl, {}),
      hidden: !d("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...m ? [{
      key: "organizations",
      label: t("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(al, {}),
      hidden: !d("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ae, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    vt,
    {
      defaultActiveKey: r,
      onChange: (u) => {
        a(`${s.pathname}#${u}`);
      },
      items: l(c.filter((u) => !u.hidden), t)
    }
  ) });
}, Zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" })), nl = () => {
  var Te, Se, Ce;
  const { message: l, modal: t } = ce.useApp(), a = ve(), { id: s } = tt(), { t: n } = X("system"), { t: i } = X("common"), [r] = o.useForm(), [m] = o.useForm(), [d, c] = x(!1), [u, j] = x(!1), [h, N] = x(null), [T, R] = x(""), [b, M] = x(1), [k, D] = x(10), { data: p, loading: $, refresh: te } = I(
    () => Fs({ id: s }),
    {
      ready: !!s,
      onError: (w) => {
        l.error(n("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", w);
      }
    }
  ), { data: Z, loading: ee, refresh: H } = I(
    () => Is({ id: s, current: b, page_size: k, search: T }),
    {
      ready: !!s,
      refreshDeps: [s, b, k, T],
      onError: (w) => {
        l.error(n("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", w);
      }
    }
  ), { data: B, loading: S } = I(
    () => Os({ current: 1, page_size: 1e3 }),
    {
      ready: d
    }
  ), { data: _, loading: z } = I(
    () => Ps({ organization_id: s, current: 1, page_size: 1e3 }),
    {
      ready: !!s
    }
  ), { loading: J, run: V } = I(
    (w) => As({ id: s }, w),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), c(!1), r.resetFields(), H();
      },
      onError: (w) => {
        l.error((w == null ? void 0 : w.err) || n("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: A, run: f } = I(
    (w) => Es({ id: s, user_id: h.id }, w),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), j(!1), m.resetFields(), N(null), H();
      },
      onError: (w) => {
        l.error((w == null ? void 0 : w.err) || n("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: O } = I(
    (w) => zs({ id: s, user_id: w }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), H();
      },
      onError: (w) => {
        l.error((w == null ? void 0 : w.err) || n("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), Q = () => {
    c(!0), r.resetFields();
  }, G = (w) => {
    var ie;
    N(w), m.setFieldsValue({
      role_ids: ((ie = w.organization_roles) == null ? void 0 : ie.map((xe) => xe.id)) || []
    }), j(!0);
  }, ue = (w) => {
    t.confirm({
      title: n("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: n("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${w.full_name || w.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => O(w.id)
    });
  }, Ve = () => {
    r.validateFields().then((w) => {
      V(w);
    });
  }, Fe = () => {
    m.validateFields().then((w) => {
      f(w);
    });
  }, Ie = ((Te = B == null ? void 0 : B.data) == null ? void 0 : Te.filter((w) => {
    var ie;
    return !((ie = Z == null ? void 0 : Z.data) != null && ie.some((xe) => xe.id === w.id));
  })) || [], Ae = [
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
      render: (w) => /* @__PURE__ */ e.jsx(ne, { color: w === "active" ? "green" : "default", children: w === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : w })
    },
    {
      title: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (w, ie) => {
        var xe;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((xe = ie.organization_roles) == null ? void 0 : xe.map((y) => /* @__PURE__ */ e.jsx(ne, { children: y.name }, y.id))) || /* @__PURE__ */ e.jsx(ne, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (w, ie) => /* @__PURE__ */ e.jsx(
        Ge,
        {
          actions: [
            {
              key: "edit",
              label: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              onClick: async () => G(ie)
            },
            {
              key: "delete",
              label: n("settings.organizations.users.remove", { defaultValue: "Remove" }),
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
        title: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              icon: /* @__PURE__ */ e.jsx(dt, {}),
              onClick: () => a("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            n("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            p == null ? void 0 : p.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(we, {}), onClick: () => {
          te(), H();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: $,
        children: /* @__PURE__ */ e.jsxs(oe, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.name", { defaultValue: "Name" }), children: p == null ? void 0 : p.name }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.slug", { defaultValue: "Slug" }), children: (p == null ? void 0 : p.slug) || "-" }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: (p == null ? void 0 : p.status) === "active" ? "green" : "default", children: (p == null ? void 0 : p.status) === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : n("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(oe.Item, { label: n("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (p == null ? void 0 : p.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: n("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Le, {}), onClick: Q, children: n("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            v.Search,
            {
              placeholder: n("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (w) => {
                R(w), M(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: Ae,
              dataSource: (Z == null ? void 0 : Z.data) || [],
              loading: ee,
              rowKey: "id",
              pagination: {
                current: b,
                pageSize: k,
                total: (Z == null ? void 0 : Z.total) || 0,
                showSizeChanger: !0,
                showTotal: (w) => i("pagination.total", { defaultValue: `Total ${w} items` }),
                onChange: (w, ie) => {
                  M(w), D(ie);
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
        title: n("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: d,
        onOk: Ve,
        onCancel: () => {
          c(!1), r.resetFields();
        },
        confirmLoading: J,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "user_id",
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: n("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  showSearch: !0,
                  placeholder: n("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: S,
                  filterOption: (w, ie) => ((ie == null ? void 0 : ie.label) ?? "").toLowerCase().includes(w.toLowerCase()),
                  options: Ie.map((w) => ({
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
              label: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: z,
                  options: ((Se = _ == null ? void 0 : _.data) == null ? void 0 : Se.map((w) => ({
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
      fe,
      {
        title: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: u,
        onOk: Fe,
        onCancel: () => {
          j(!1), m.resetFields(), N(null);
        },
        confirmLoading: A,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: m, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                v,
                {
                  value: (h == null ? void 0 : h.full_name) || (h == null ? void 0 : h.username),
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
                q,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: z,
                  options: ((Ce = _ == null ? void 0 : _.data) == null ? void 0 : Ce.map((w) => ({
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
}, Xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nl
}, Symbol.toStringTag, { value: "Module" })), ol = He(() => import("./markdown-viewer.js")), rl = Rt(({ css: l }) => ({
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
})), { TextArea: ht } = v, dl = (l) => l.toLowerCase().endsWith(".md");
function Nt(l) {
  return l.map((t) => {
    var a;
    return {
      key: t.path,
      title: t.name,
      isLeaf: !t.is_dir,
      icon: t.is_dir ? /* @__PURE__ */ e.jsx(Ft, {}) : /* @__PURE__ */ e.jsx(It, {}),
      children: (a = t.children) != null && a.length ? Nt(t.children) : void 0
    };
  });
}
function lt(l) {
  return l.includes("/") ? l.replace(/\/[^/]+$/, "") : "";
}
const ul = () => {
  const { message: l, modal: t } = ce.useApp(), { styles: a } = rl(), { id: s } = tt(), n = ve(), { t: i } = X("system"), [r, m] = x(null), [d, c] = x(null), [u, j] = x(!1), [h, N] = x(""), [T, R] = x(!1), [b, M] = x([]), [k, D] = x(!1), [p, $] = x(!1), [te, Z] = x(""), [ee] = o.useForm(), [H, B] = x(null), [S, _] = x(null), [z, J] = x(""), [V] = o.useForm(), { data: A } = I(
    () => s ? C.system.getSkill({ id: s }) : Promise.reject(new Error("No id")),
    { refreshDeps: [s], ready: !!s }
  ), { data: f, loading: O, refresh: Q } = I(
    () => s ? C.system.listSkillFilesTree({ id: s }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [s],
      ready: !!s,
      onSuccess: (F) => {
        if (!r) {
          for (const P of F)
            if (!P.is_dir && P.name === "SKILL.md") {
              c(P.path), m(P.path), j(!1);
              return;
            }
          for (const P of F)
            if (!P.is_dir && P.name === "SKILLS.md") {
              c(P.path), m(P.path), j(!1);
              return;
            }
        }
      }
    }
  ), G = !!(A != null && A.is_preset), ue = je(() => Nt(f || []), [f]), Ve = u && d ? d : r ? lt(r) : "", { loading: Fe } = I(() => !s || !r ? Promise.reject(new Error("No id or selected file")) : C.system.getSkillFile({ id: s, path: r || "" }), {
    refreshDeps: [s, r],
    ready: !!s && !!r,
    onSuccess: (F) => {
      N(F.data);
    },
    onBefore: () => {
      N("");
    },
    onError: () => l.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), Ie = () => {
    !s || !r || G || C.system.putSkillFile({ id: s, path: r }, h).then(() => {
      l.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), R(!1);
    }).catch(() => l.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, Ae = (F, P) => {
    const se = String(P.node.key), ge = !P.node.isLeaf;
    c(se), j(ge), P.node.isLeaf ? m(se) : m(null);
  }, Te = (F) => {
    F.event.preventDefault(), B({
      path: String(F.node.key),
      isDir: !F.node.isLeaf,
      x: F.event.clientX,
      y: F.event.clientY
    });
  }, Se = ye(() => B(null), []), Ce = ye(
    (F) => {
      if (!s || !H || G) return;
      const { path: P, isDir: se } = H;
      switch (Se(), F) {
        case "open":
          m(P), c(P), j(!1);
          break;
        case "rename": {
          const ge = P.includes("/") ? P.split("/").pop() : P;
          _({ path: P, isDir: se }), J(ge), setTimeout(() => V.setFieldsValue({ name: ge }), 0);
          break;
        }
        case "delete":
          t.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: se ? i("settings.skills.editor.deleteConfirmContentDir", { path: P, defaultValue: `Delete ${P}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: P, defaultValue: `Delete ${P}?` }),
            onOk: () => C.system.deleteSkillPath({ id: s, path: P }).then(() => {
              l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === P && (m(null), N("")), d === P && (c(null), j(!1)), Q();
            }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          c(P), j(se), D(!0);
          break;
        case "newDir":
          c(P), j(se), $(!0);
          break;
      }
    },
    [s, H, Se, Q, r, d, V, i, G]
  ), w = () => {
    if (!s || !S || G) return;
    const F = (V.getFieldValue("name") ?? z).trim();
    if (!F) {
      l.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!S.isDir && !/\.(md|txt)$/i.test(F)) {
      l.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const P = lt(S.path), se = P ? `${P}/${F}` : F;
    if (se === S.path) {
      _(null);
      return;
    }
    C.system.moveSkillPath({ id: s }, { from_path: S.path, to_path: se }).then(() => {
      l.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), r === S.path && m(se), d === S.path && c(se), _(null), Q();
    }).catch(() => l.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, ie = (F) => {
    if (!s || G) return;
    const P = String(F.dragNode.key), se = String(F.dragNode.title);
    let ge;
    if (F.dropToGap) {
      const Ze = lt(String(F.node.key));
      ge = Ze ? `${Ze}/${se}` : se;
    } else
      ge = `${F.node.key}/${se}`;
    ge !== P && C.system.moveSkillPath({ id: s }, { from_path: P, to_path: ge }).then(() => {
      l.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), r === P && m(ge), d === P && c(ge), Q();
    }).catch(() => l.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, xe = () => {
    const F = te.trim();
    if (!F || !s || G) return;
    const P = Ve ? `${Ve}/${F}` : F;
    if (!/\.(md|txt)$/i.test(F)) {
      l.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    C.system.putSkillFile({ id: s, path: P }, "").then(() => {
      l.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), D(!1), Z(""), Q(), m(P), N("");
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, y = () => {
    var se;
    const F = (se = ee.getFieldValue("name")) == null ? void 0 : se.trim();
    if (!F || !s || G) return;
    const P = Ve ? `${Ve}/${F}` : F;
    C.system.createSkillDir({ id: s }, { path: P }).then(() => {
      l.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), $(!1), ee.resetFields(), Q();
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, U = () => {
    const F = d || r;
    !s || !F || G || t.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: F, defaultValue: `Delete ${F}?` }),
      onOk: () => C.system.deleteSkillPath({ id: s, path: F }).then(() => {
        l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === F && (m(null), N("")), d === F && (c(null), j(!1)), Q();
      }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return s ? /* @__PURE__ */ e.jsxs(
    ae,
    {
      title: (A == null ? void 0 : A.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => n("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        G ? /* @__PURE__ */ e.jsx(
          it,
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
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Le, {}), disabled: G, onClick: () => D(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Ft, {}), disabled: G, onClick: () => $(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            O ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Gt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !G,
                expandedKeys: b,
                onExpand: (F) => M(F),
                selectedKeys: d ? [d] : [],
                onSelect: Ae,
                onRightClick: G ? void 0 : Te,
                onDrop: ie,
                className: a.fileTree,
                treeData: ue
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            r && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: r }),
                /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ke, {}), disabled: G || !T, onClick: Ie, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(E, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ee, {}), disabled: G, onClick: U, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(be, { spinning: Fe, wrapperClassName: Rs(a.editorSpin, "ez-editor-spin"), children: dl(r) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  ht,
                  {
                    value: h,
                    readOnly: G,
                    onChange: (F) => {
                      N(F.target.value), R(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(ol, { content: Ot(h) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                ht,
                {
                  value: h,
                  readOnly: G,
                  onChange: (F) => {
                    N(F.target.value), R(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              ) })
            ] }),
            !r && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        H && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: Se,
              onContextMenu: (F) => F.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: H.x, top: H.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            Zt,
            {
              selectable: !1,
              items: [
                ...H.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(It, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Ne, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ee, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(us, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(cs, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: F }) => Ce(F)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: k, onOk: xe, onCancel: () => {
          D(!1), Z("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(v, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: te, onChange: (F) => Z(F.target.value) }) }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: p, onOk: () => ee.validateFields().then(y), onCancel: () => $(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(o, { form: ee, layout: "vertical", children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(v, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!S,
            onOk: w,
            onCancel: () => _(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(o, { form: V, layout: "vertical", onValuesChange: (F, P) => J(P.name ?? ""), children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: S != null && S.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              v,
              {
                placeholder: S != null && S.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => w()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ul
}, Symbol.toStringTag, { value: "Module" })), cl = He(() => import("./markdown-viewer.js")), ml = () => {
  const { message: l } = ce.useApp(), { id: t } = tt(), a = ve(), { t: s } = X("system"), { data: n, loading: i } = I(
    () => t ? C.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: r, loading: m, mutate: d } = I(
    () => t ? C.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => l.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => d()
    }
  ), c = je(() => r == null ? void 0 : r.map((j) => ({
    key: j.file_name,
    label: j.file_name,
    children: /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(cl, { content: Ot(j.content) }) })
  })), [r]);
  if (!t) return null;
  const u = i || m;
  return /* @__PURE__ */ e.jsx(be, { spinning: u, children: /* @__PURE__ */ e.jsx(
    ae,
    {
      title: (n == null ? void 0 : n.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => a("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: c
    }
  ) });
}, Yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ml
}, Symbol.toStringTag, { value: "Module" })), { Text: he, Title: pl } = St, ot = ["agent", "llm", "tool"], xt = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(ys, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(xs, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(hs, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(nt, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Xe, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(gs, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Xe, {}) }
}, yt = {
  agent: "#1677ff",
  llm: "#52c41a",
  tool: "#fa8c16"
}, fl = {
  llm_request: "#1677ff",
  llm_response: "#52c41a",
  tool_call: "#fa8c16",
  tool_result: "#13c2c2",
  token_usage: "#722ed1",
  error: "#ff4d4f",
  summary: "#2f54eb"
}, gl = Rt(({ token: l, css: t }) => ({
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
function Lt(l) {
  const { parsed: t, isJSON: a } = Be(l);
  return a && typeof t == "object" && t !== null ? { text: l, value: t } : { text: l };
}
function jt(l) {
  if (typeof l == "string") return { text: l };
  const t = JSON.stringify(l, null, 2);
  return typeof l == "object" && l !== null ? { text: t, value: l } : { text: t };
}
function hl(l) {
  const t = l.map((s) => {
    const { parsed: n, isJSON: i } = Be(s.content);
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
      s.display = { text: JSON.stringify(d, null, 2), value: d }, r !== void 0 && a && (a.rawRequest = jt(r)), m !== void 0 && (s.rawResponse = jt(m));
    }
    a = null;
  }
  return t;
}
const Je = ({ children: l, fallback: t }) => {
  const [a, s] = x(!1);
  return ze(() => {
    let n = 0;
    const i = window.requestAnimationFrame(() => {
      n = window.requestAnimationFrame(() => s(!0));
    });
    return () => {
      window.cancelAnimationFrame(i), window.cancelAnimationFrame(n);
    };
  }, []), a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t ?? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "16px 0" }, children: /* @__PURE__ */ e.jsx(be, { size: "small" }) }) });
}, ke = ({
  payload: l,
  maxHeight: t
}) => {
  const [a, s] = x("raw"), n = /* @__PURE__ */ e.jsx(
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
    /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", top: 6, right: 6, zIndex: 2 }, children: /* @__PURE__ */ e.jsx(
      et,
      {
        size: "small",
        value: a,
        onChange: (i) => s(i),
        options: [
          { value: "raw", icon: /* @__PURE__ */ e.jsx(Et, {}), title: "Raw" },
          { value: "json", icon: /* @__PURE__ */ e.jsx(zt, {}), title: "JSON" }
        ]
      }
    ) }),
    a === "json" ? /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(
      Qe,
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
}, at = "#ff4d4f";
function Dt(l, t) {
  if (!t || !l) return !1;
  if (typeof l.ok == "boolean") return !l.ok;
  const a = (l.result || "").trim();
  return a ? !!(a === "tool call failed" || /^unknown tool:/i.test(a) || /^tool .+ failed:/i.test(a)) : !1;
}
const xl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  if (!l.isJSON)
    return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
  const s = l.parsed;
  return /* @__PURE__ */ e.jsxs(oe, { size: "small", column: 2, bordered: !0, style: { maxHeight: a, overflow: "auto" }, children: [
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
  ] });
}, yl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = je(
    () => s != null && s.arguments ? Lt(s.arguments) : null,
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
      /* @__PURE__ */ e.jsx(ke, { payload: n, maxHeight: a })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, jl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = je(
    () => s != null && s.result ? Lt(s.result) : null,
    [s]
  );
  if (!s)
    return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
  const i = Dt(s, !0);
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
      /* @__PURE__ */ e.jsx(ke, { payload: n, maxHeight: a })
    ] })
  ] });
}, Ut = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 8
}, bl = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = x("request");
  return l.rawRequest ? /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx("div", { style: Ut, children: /* @__PURE__ */ e.jsx(
      et,
      {
        size: "small",
        value: s,
        onChange: (i) => n(i),
        options: [
          {
            value: "request",
            label: t("trace.request", { defaultValue: "Request" })
          },
          {
            value: "raw",
            label: t("trace.rawRequest", { defaultValue: "Raw Request" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(ke, { payload: l.rawRequest, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, Vl = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = x("response");
  return l.rawResponse ? /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx("div", { style: Ut, children: /* @__PURE__ */ e.jsx(
      et,
      {
        size: "small",
        value: s,
        onChange: (i) => n(i),
        options: [
          {
            value: "response",
            label: t("trace.response", { defaultValue: "Response" })
          },
          {
            value: "raw",
            label: t("trace.rawResponse", { defaultValue: "Raw Response" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(ke, { payload: l.rawResponse, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, bt = ({ entry: l, t, maxHeight: a }) => {
  const { event: s } = l;
  switch (s.event_type) {
    case "llm_request":
      return /* @__PURE__ */ e.jsx(bl, { entry: l, t, maxHeight: a });
    case "llm_response":
      return /* @__PURE__ */ e.jsx(Vl, { entry: l, t, maxHeight: a });
    case "token_usage":
      return /* @__PURE__ */ e.jsx(xl, { entry: l, t, maxHeight: a });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(yl, { entry: l, t, maxHeight: a });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(jl, { entry: l, t, maxHeight: a });
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
      return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
  }
};
function Vt(l) {
  return ot.indexOf(l);
}
function kt(l, t) {
  return l > 0 ? ` (${t("trace.durationMs", {
    ms: l,
    defaultValue: `${l}ms`
  })})` : "";
}
function kl(l, t) {
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
    }), d = fl[r.event_type] || "#8c8c8c";
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
          label: `${m}${kt(r.duration_ms, t)}`,
          kind: "return",
          color: d
        };
      case "tool_call": {
        const c = n.isJSON ? n.parsed : null, u = (c == null ? void 0 : c.tool) || m;
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "tool",
          label: u,
          kind: "call",
          color: d
        };
      }
      case "tool_result": {
        const c = n.isJSON ? n.parsed : null, u = Dt(c, n.isJSON), j = (c == null ? void 0 : c.tool_call_id) && a.get(c.tool_call_id) || "", h = j ? `${m}: ${j}` : m;
        return {
          id: r.id,
          entry: n,
          from: "tool",
          to: "agent",
          label: u ? `${h} · ${s}` : h,
          kind: "return",
          color: u ? at : d,
          failed: u
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
        const c = n.isJSON ? n.parsed : null, u = (c == null ? void 0 : c.total_tokens) != null ? ` · ${c.total_tokens}` : "";
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: `${m}${u}`,
          kind: "note",
          color: d
        };
      }
      case "error": {
        const c = i > 0 ? l[i - 1].event : void 0, u = (c == null ? void 0 : c.event_type) === "llm_request", j = `${m}${kt(r.duration_ms, t)} · ${s}`;
        return u ? {
          id: r.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: j,
          kind: "return",
          color: at,
          failed: !0
        } : {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: j,
          kind: "note",
          color: at,
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
const vl = ({ from: l, to: t, label: a, color: s, kind: n, failed: i, styles: r, cx: m }) => {
  const d = Vt(l), c = Vt(t), u = (Math.min(d, c) + 0.5) * (100 / 3), j = (Math.max(d, c) + 0.5) * (100 / 3), h = j - u, N = c > d, T = n === "return";
  return /* @__PURE__ */ e.jsxs("div", { className: r.arrowTrack, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowLine,
        style: {
          left: `${u}%`,
          width: `${h}%`,
          borderTopColor: s,
          borderTopStyle: T ? "dashed" : "solid"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowHead,
        style: N ? {
          left: `calc(${j}% - 2px)`,
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
        className: m(r.arrowLabel, i && r.arrowLabelFailed),
        style: { color: s, borderColor: s },
        title: a,
        children: [
          i && /* @__PURE__ */ e.jsx(At, { className: r.failIcon }),
          /* @__PURE__ */ e.jsx("span", { children: a })
        ]
      }
    )
  ] });
}, Sl = ({ entries: l, t, selectedId: a, onSelect: s }) => {
  const { styles: n, cx: i } = gl(), r = je(
    () => kl(l, t),
    [l, t]
  ), m = (d) => t(`trace.actors.${d}`, {
    defaultValue: d === "agent" ? "Agent" : d === "llm" ? "LLM" : "Tool"
  });
  return r.length === 0 ? /* @__PURE__ */ e.jsx(
    Re,
    {
      description: t("trace.noEvents", {
        defaultValue: "No trace events found for this trace ID"
      })
    }
  ) : /* @__PURE__ */ e.jsx("div", { className: n.sequenceWrap, children: /* @__PURE__ */ e.jsxs("div", { className: n.sequenceInner, children: [
    /* @__PURE__ */ e.jsx("div", { className: n.actorHeader, children: ot.map((d) => /* @__PURE__ */ e.jsx(
      "div",
      {
        className: n.actorBox,
        style: { borderColor: yt[d], color: yt[d] },
        children: m(d)
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: n.messageList, children: [
      /* @__PURE__ */ e.jsx("div", { className: n.lifelineBg, children: ot.map((d) => /* @__PURE__ */ e.jsx("div", { className: n.lifeline }, d)) }),
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
                  d.failed && /* @__PURE__ */ e.jsx(At, { className: n.failIcon }),
                  /* @__PURE__ */ e.jsx("span", { children: d.label })
                ]
              }
            ) : /* @__PURE__ */ e.jsx(
              vl,
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
}, _l = () => {
  const { message: l, modal: t } = ce.useApp(), { t: a } = X("ai"), s = ve(), [n, i] = x(""), [r, m] = x(""), [d, c] = x("sequence"), [u, j] = x(
    null
  ), {
    data: h,
    loading: N,
    refresh: T
  } = I(() => C.ai.getAiTraceStatus(), {
    onError: () => {
      l.error(
        a("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), R = (h == null ? void 0 : h.enabled) ?? !1, { loading: b, run: M } = I(
    (_) => C.ai.toggleAiTrace({ enabled: _ }),
    {
      manual: !0,
      onSuccess: (_, [z]) => {
        l.success(
          z ? a("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : a("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), T(), z || m("");
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
    data: k,
    loading: D,
    run: p
  } = I(
    (_) => C.ai.getAiTraceEvents({ trace_id: _ }),
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
  ), $ = ye(() => {
    n.trim() && (m(n.trim()), j(null), p(n.trim()));
  }, [n, p]), te = ye(
    (_) => {
      const z = _ ? a("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : a("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      t.confirm({
        title: _ ? a("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : a("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: z,
        onOk: () => M(_)
      });
    },
    [a, M, t]
  ), Z = ye(async () => {
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
        const z = await _.blob(), J = window.URL.createObjectURL(z), V = document.createElement("a");
        V.href = J, V.download = `ai-trace-${r}.json`, document.body.appendChild(V), V.click(), window.URL.revokeObjectURL(J), document.body.removeChild(V);
      } catch {
        l.error(
          a("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [r, a]), ee = je(() => k ?? [], [k]), H = je(() => hl(ee), [ee]);
  ze(() => {
    j(null);
  }, [r, d]);
  const B = je(
    () => H.map((_) => {
      const { event: z } = _, J = xt[z.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Xe, {})
      }, V = a(`trace.eventTypes.${z.event_type}`, {
        defaultValue: z.event_type
      });
      return {
        key: z.id,
        dot: J.icon,
        color: J.color,
        children: /* @__PURE__ */ e.jsx(
          Xt,
          {
            size: "small",
            defaultActiveKey: [z.id],
            items: [
              {
                key: z.id,
                label: /* @__PURE__ */ e.jsxs(K, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ne, { color: J.color, children: V }),
                  /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    z.step_order
                  ] }),
                  z.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    a("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    z.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(he, { type: "secondary", style: { fontSize: 12 }, children: new Date(z.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(bt, { entry: _, t: a, maxHeight: 400 }) })
              }
            ]
          }
        )
      };
    }),
    [H, a]
  ), S = u ? xt[u.event.event_type] : null;
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
              E,
              {
                icon: /* @__PURE__ */ e.jsx(dt, {}),
                onClick: () => s("/system/settings#ai-models"),
                children: a("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(pl, { level: 4, style: { margin: 0 }, children: a("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(he, { children: R ? a("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : a("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: R,
                loading: N || b,
                onChange: te
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(K.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        v,
        {
          placeholder: a("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: n,
          onChange: (_) => i(_.target.value),
          onPressEnter: $,
          prefix: /* @__PURE__ */ e.jsx(ms, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(E, { type: "primary", onClick: $, loading: D, children: a("trace.search", { defaultValue: "Search" }) }),
      r && ee.length > 0 && /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ps, {}), onClick: Z, children: a("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    D ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(be, { size: "large" }) }) }) : r && ee.length === 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Re,
      {
        description: a("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : ee.length > 0 ? /* @__PURE__ */ e.jsx(
      ae,
      {
        title: /* @__PURE__ */ e.jsx(
          et,
          {
            value: d,
            onChange: (_) => c(_),
            options: [
              {
                label: a("trace.viewSequence", {
                  defaultValue: "Sequence"
                }),
                value: "sequence",
                icon: /* @__PURE__ */ e.jsx(fs, {})
              },
              {
                label: a("trace.viewTimeline", {
                  defaultValue: "Timeline"
                }),
                value: "timeline",
                icon: /* @__PURE__ */ e.jsx(Tt, {})
              }
            ]
          }
        ),
        children: d === "sequence" ? /* @__PURE__ */ e.jsx(
          Sl,
          {
            entries: H,
            t: a,
            selectedId: u == null ? void 0 : u.event.id,
            onSelect: j
          }
        ) : /* @__PURE__ */ e.jsx(Qt, { items: B })
      }
    ) : null,
    /* @__PURE__ */ e.jsx(
      Yt,
      {
        title: u ? /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(ne, { color: (S == null ? void 0 : S.color) || "default", children: a(`trace.eventTypes.${u.event.event_type}`, {
            defaultValue: u.event.event_type
          }) }),
          /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            "#",
            u.event.step_order
          ] }),
          u.event.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            a("trace.duration", { defaultValue: "Duration" }),
            ":",
            " ",
            u.event.duration_ms,
            "ms"
          ] })
        ] }) : null,
        open: d === "sequence" && !!u,
        onClose: () => j(null),
        width: 560,
        children: u && /* @__PURE__ */ e.jsx(Je, { children: /* @__PURE__ */ e.jsx(bt, { entry: u, t: a }) }, u.event.id)
      }
    )
  ] });
}, ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _l
}, Symbol.toStringTag, { value: "Module" })), wl = He(() => import("./json-schema-config-form.js")), { Text: Pe, Title: Cl } = St, Tl = ({
  content: l,
  maxHeight: t = 400
}) => {
  const { parsed: a, isJSON: s } = Be(l);
  return s ? /* @__PURE__ */ e.jsx(
    Qe,
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
}, Fl = () => {
  var V;
  const { message: l } = ce.useApp(), { t } = X("system"), { t: a } = X("common"), s = ve(), { id: n } = tt(), [i, r] = x(void 0), [m, d] = x("schema"), [c, u] = x({}), [j, h] = x("{}"), [N, T] = x(null), [R, b] = x(null), { loading: M, data: k } = I(
    () => C.system.getToolSet({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: D, data: p } = I(
    () => C.system.getToolSetTools({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), $ = p == null ? void 0 : p.find(
    (A) => {
      var f;
      return ((f = A.function) == null ? void 0 : f.name) === i;
    }
  ), { loading: te, run: Z } = I(
    (A, f) => C.system.callTool({ id: n }, { name: A, parameters: f }),
    {
      manual: !0,
      onSuccess: (A) => {
        T((A == null ? void 0 : A.result) ?? "");
      },
      onError: (A) => {
        var O, Q;
        const f = ((Q = (O = A.response) == null ? void 0 : O.data) == null ? void 0 : Q.message) || A.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        l.error(f), T(null);
      }
    }
  ), ee = ye((A) => {
    r(A), u({}), h("{}"), T(null), b(null);
  }, []), H = ye(() => {
    if (m === "schema")
      h(JSON.stringify(c, null, 2)), d("code");
    else {
      const { parsed: A, isJSON: f } = Be(j);
      f && (u(A), b(null)), d("schema");
    }
  }, [m, c, j]), B = ye((A) => {
    h(A);
    const { parsed: f, isJSON: O } = Be(A);
    O ? (u(f), b(null)) : b(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), S = ye(() => {
    if (!i) {
      l.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let A;
    if (m === "code") {
      if (R) {
        l.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      A = j;
    } else
      A = JSON.stringify(c);
    T(null), Z(i, A);
  }, [i, m, c, j, R, Z, t]), _ = k, z = (_ == null ? void 0 : _.status) === "enabled" ? "green" : "red", J = (_ == null ? void 0 : _.status) === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsx(
        E,
        {
          icon: /* @__PURE__ */ e.jsx(dt, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(Cl, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, loading: M, children: _ && /* @__PURE__ */ e.jsxs(oe, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: _.name }) }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(ne, { color: "blue", children: String(_.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: _.description || "-" }),
      /* @__PURE__ */ e.jsx(oe.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: z, children: J }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        D ? /* @__PURE__ */ e.jsx(be, { size: "small" }) : /* @__PURE__ */ e.jsx(
          q,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: i,
            onChange: ee,
            optionLabelProp: "label",
            children: (p ?? []).map((A) => {
              var G, ue;
              const f = ((G = A.function) == null ? void 0 : G.name) ?? "", O = ((ue = A.function) == null ? void 0 : ue.description) ?? "", Q = O ? `${f} - ${O}` : f;
              return /* @__PURE__ */ e.jsx(q.Option, { value: f, label: Q, children: /* @__PURE__ */ e.jsx(
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
              ) }, f);
            })
          }
        )
      ] }),
      $ && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            Ye,
            {
              title: m === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  size: "small",
                  icon: m === "schema" ? /* @__PURE__ */ e.jsx(zt, {}) : /* @__PURE__ */ e.jsx(Et, {}),
                  onClick: H
                }
              )
            }
          )
        ] }),
        m === "schema" ? (V = $.function) != null && V.parameters ? /* @__PURE__ */ e.jsx(We, { fallback: /* @__PURE__ */ e.jsx(De, {}), children: /* @__PURE__ */ e.jsx(
          wl,
          {
            schema: $.function.parameters,
            value: c,
            onChange: u
          }
        ) }) : /* @__PURE__ */ e.jsx(Pe, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            Ms,
            {
              value: j,
              height: "200px",
              extensions: [Ns()],
              onChange: B,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          R && /* @__PURE__ */ e.jsx(Pe, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: R })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: N !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        E,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(js, {}),
          loading: te,
          disabled: !i,
          onClick: S,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      N !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Pe, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(Tl, { content: N, maxHeight: 300 })
      ] })
    ] })
  ] });
}, ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fl
}, Symbol.toStringTag, { value: "Module" })), Il = () => {
  const { t: l } = X("system"), [t] = Ss(), a = t.get("provider"), s = t.get("code"), n = t.get("state"), [i, r] = x(null), [m, d] = x(null), [c, u] = x(null);
  return I(async () => {
    if (!s || !n || !a)
      throw new Error(l("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const j = await C.system.testOauthCallback({ code: s, state: n, provider: a });
    if (!j.user_info)
      throw new Error(l("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!j.user)
      throw new Error(l("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    r(j.user), d(j.user_info);
  }, {
    onSuccess: () => {
      u({
        status: "success",
        message: l("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (j) => {
      u({
        status: "error",
        message: l("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: j.message
      });
    }
  }), c ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    es,
    {
      status: c.status,
      title: c.message,
      subTitle: c.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !m || !i ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ae, { title: l("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Qe, { value: m || {} }) }),
        /* @__PURE__ */ e.jsx(ae, { title: l("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Qe, { value: i || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(De, {});
}, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Il
}, Symbol.toStringTag, { value: "Module" }));
export {
  ea as A,
  Xl as O,
  Ql as S,
  ta as T,
  Yl as a,
  sa as b,
  Zl as i
};
