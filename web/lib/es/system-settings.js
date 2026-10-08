import { j as e, g as Tt, h as Ft } from "./vendor.js";
import { App as me, Form as o, Spin as ye, Switch as de, Select as B, Input as V, Alert as Xe, Divider as Je, Space as W, Button as E, InputNumber as oe, Modal as fe, Skeleton as Yt, Descriptions as re, Steps as es, Tag as ne, Table as Ae, Radio as Be, Tabs as It, Popconfirm as At, Tooltip as st, Card as ae, Row as We, Col as we, Checkbox as it, Empty as De, AutoComplete as ht, Upload as ts, Typography as mt, Tree as ss, Menu as ls, Collapse as as, Timeline as is, Segmented as lt, Drawer as ns, Result as os } from "antd";
import { useTranslation as Z } from "react-i18next";
import { useState as y, useEffect as Fe, useMemo as be, Suspense as Ge, lazy as Qe, useCallback as xe, useRef as rs } from "react";
import { useRequest as A } from "ahooks";
import { SaveOutlined as qe, ReloadOutlined as ve, LoadingOutlined as ds, CheckCircleTwoTone as us, ClearOutlined as cs, StarFilled as ms, CheckCircleOutlined as ps, StarOutlined as fs, EditOutlined as Oe, CopyOutlined as Et, DeleteOutlined as Ie, BugOutlined as zt, PlusOutlined as Re, ThunderboltOutlined as gs, ToolOutlined as dt, SettingOutlined as hs, FileTextOutlined as Ye, EyeOutlined as Lt, UploadOutlined as xt, UnorderedListOutlined as Ot, CalendarOutlined as xs, UndoOutlined as ut, ArrowLeftOutlined as pt, FolderOutlined as Rt, FileOutlined as Pt, FileAddOutlined as ys, FolderAddOutlined as js, SearchOutlined as bs, DownloadOutlined as Vs, ApartmentOutlined as ks, WarningOutlined as vs, DashboardOutlined as Ss, MessageOutlined as _s, SendOutlined as ws, CloseCircleOutlined as Mt, AlignLeftOutlined as Nt, CodeOutlined as Dt, PlayCircleOutlined as Cs } from "@ant-design/icons";
import { a as v } from "./index.js";
import { g as yt, h as qt, j as He } from "./base.js";
import { g as ce, d as Ts, b as Pe, L as Ue } from "./components.js";
import Ut from "react-quill-new";
import { b as ft, u as Fs, a as $t } from "./contexts.js";
import { useNavigate as Se, useLocation as Is, useParams as at, useSearchParams as Bt } from "react-router-dom";
import { l as As, c as Es, u as zs, d as Ls, g as Os, b as Rs, e as Ps, f as Ms, r as Ns } from "./system.js";
import { l as Ds, b as qs } from "./authorization.js";
import { createStyles as gt } from "antd-style";
import Us from "classnames";
import et from "@uiw/react-json-view";
import $s from "@uiw/react-codemirror";
import { json as Bs } from "@codemirror/lang-json";
const Me = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Js = {
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
}, Ws = ({ initialData: l, onRefresh: t }) => {
  const { message: a } = me.useApp(), { t: s } = Z("system"), { t: n } = Z("common"), [i] = o.useForm(), [r, c] = y((l == null ? void 0 : l.provider) || "custom"), [d, u] = y((l == null ? void 0 : l.provider) === "custom" || (l == null ? void 0 : l.provider) === "autoDiscover"), [p, j] = y((l == null ? void 0 : l.enabled) || !1), [g, R] = y((l == null ? void 0 : l.auto_create_user) || !1), { loading: w, data: z, refresh: k } = A(v.system.getOauthSettings, {
    manual: !!l,
    onSuccess: (_) => {
      i.setFieldsValue(_), c(_.provider), u(_.provider === "custom" || _.provider === "autoDiscover"), j(_.enabled), R(_.auto_create_user);
    },
    onError: (_) => {
      a.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", _);
    }
  });
  Fe(() => {
    l && (i.setFieldsValue(l), c(l.provider), u(l.provider === "custom" || l.provider === "autoDiscover"), j(l.enabled), R(l.auto_create_user));
  }, [l, i]);
  const P = (_) => {
    c(_), u(_ === "custom" || _ === "autoDiscover");
    const O = Js[_];
    O && i.setFieldsValue({
      auth_endpoint: O.endpoints.auth_endpoint,
      token_endpoint: O.endpoints.token_endpoint,
      userinfo_endpoint: O.endpoints.userinfo_endpoint,
      scope: O.scope,
      // Set field mappings
      email_field: O.email_field,
      username_field: O.username_field,
      full_name_field: O.full_name_field,
      avatar_field: O.avatar_field,
      role_field: O.role_field,
      // Set display configuration
      icon_url: O.icon_url,
      display_name: O.display_name
    });
  }, S = (_) => {
    j(_);
  }, q = (_) => {
    R(_);
  }, { loading: f, run: J } = A(v.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      a.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), t ? t() : k();
    },
    onError: (_) => {
      a.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", _);
    }
  }), Y = (_) => {
    J(_);
  }, K = () => {
    t ? t() : k();
  }, { loading: te, run: G } = A(async ({ redirect_uri: _, ...O }) => {
    let L;
    return _ ? L = new URL(_) : L = new URL(window.location.origin), L.pathname = yt("/system/settings/oauth/test-callback"), L.searchParams.set("provider", r), v.system.testOauthConnection({ redirect_uri: L.toString(), ...O });
  }, {
    manual: !0,
    onSuccess: ({ url: _ }) => {
      window.open(_, "_blank");
    },
    onError: (_) => {
      a.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: _.message })), console.error("Failed to test OAuth connection", _);
    }
  }), H = () => r === "custom";
  return /* @__PURE__ */ e.jsx(ye, { spinning: w, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: Y,
      initialValues: l || z,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: S })
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
                required: p,
                message: s("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(B, { onChange: P, disabled: !p, children: [
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
          o.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              V,
              {
                disabled: !p,
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
                pattern: Me,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: "https://example.com/icon.png" })
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
                required: p,
                message: s("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
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
                required: p,
                message: s("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !p, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: p && r === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Me,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
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
                pattern: Me,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: p && r === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: p && r === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Me,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
          }
        ),
        H() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: p && r === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Me,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
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
                required: p,
                message: s("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(_) => _.getFieldValue("redirect_uri") !== "" ? {
              pattern: Me,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p, placeholder: `http://${window.location.host}${yt(`/login?provider=settings.${r}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(de, { onChange: q, disabled: !p })
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
                required: p && g,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !p || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(B, { disabled: !p, children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "new_user_only", children: s("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "temporary", children: s("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Xe,
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
            children: /* @__PURE__ */ e.jsx(de, { disabled: !p })
          }
        ),
        /* @__PURE__ */ e.jsx(Je, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Xe,
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
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "email", disabled: !p || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "login", autoComplete: "off", disabled: !p || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "name", disabled: !p || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "avatar_url", disabled: !p || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "role", disabled: !p || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(qe, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              loading: te,
              onClick: async () => {
                const _ = i.getFieldsValue();
                G(_);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: K,
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Hs = () => {
  const { message: l } = me.useApp(), { t } = Z("system"), { t: a } = Z("common"), [s] = o.useForm(), { loading: n, data: i, refresh: r } = A(v.system.getSecuritySettings, {
    onSuccess: (p) => {
      s.setFieldsValue(p);
    },
    onError: (p) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", p);
    }
  }), { loading: c, run: d } = A(v.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), r();
    },
    onError: (p) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", p);
    }
  }), u = (p) => {
    d(p);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: n, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: s,
      layout: "vertical",
      onFinish: u,
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
            children: /* @__PURE__ */ e.jsxs(B, { children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(B.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            shouldUpdate: (p, j) => p.login_failure_lock !== j.login_failure_lock,
            children: ({ getFieldValue: p }) => p("login_failure_lock") ? /* @__PURE__ */ e.jsx(
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
            shouldUpdate: (p, j) => p.login_failure_lock !== j.login_failure_lock,
            children: ({ getFieldValue: p }) => p("login_failure_lock") ? /* @__PURE__ */ e.jsx(
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
            shouldUpdate: (p, j) => p.history_password_check !== j.history_password_check,
            children: ({ getFieldValue: p }) => p("history_password_check") ? /* @__PURE__ */ e.jsx(
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
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: c,
              icon: /* @__PURE__ */ e.jsx(qe, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => r(),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ks = ({ fetchItems: l, importItems: t, columns: a, ...s }) => {
  const { message: n } = me.useApp(), { t: i } = Z("system"), [r, c] = y([]), [d, u] = y([]), { run: p, loading: j } = A(l, {
    onError: (w) => {
      n.error(i("settings.ldap.importError", { error: `${w.message}` }));
    },
    onSuccess: (w) => {
      c(w);
    },
    manual: !0
  }), { run: g, loading: R } = A(async () => {
    for (const w of d.filter((z) => {
      const k = r.find((P) => P.ldap_dn === z);
      return !(!k || k.status === "imported");
    })) {
      const z = await t([w]);
      c((k) => [...k].map((S) => {
        for (const q of z)
          if (S.ldap_dn === q.ldap_dn)
            return { ...q, status: "imported" };
        return S;
      }));
    }
  }, {
    manual: !0
  });
  return Fe(() => {
    s.visible && (c([]), p(), u([]));
  }, [s.visible]), /* @__PURE__ */ e.jsx(
    fe,
    {
      title: i("settings.ldap.importTitle"),
      ...s,
      onOk: () => {
        g();
      },
      width: 900,
      confirmLoading: R,
      loading: j,
      children: /* @__PURE__ */ e.jsx(
        Ae,
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
          columns: a.map(({ render: w, ...z }) => w ? {
            ...z,
            render: (k, P, S) => {
              const q = d.includes(P.ldap_dn) && R && P.status !== "imported";
              return w(k, P, S, q);
            }
          } : z),
          dataSource: r,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Gs = () => {
  var P, S, q;
  const { message: l } = me.useApp(), { t } = Z("system"), [a] = o.useForm(), [s, n] = y(!1), [i, r] = y(null), [c, d] = y(!1), [u, p] = y(!1), [j] = o.useForm(), [g, R] = y(!1);
  A(v.system.getLdapSettings, {
    onSuccess: (f) => {
      a.setFieldsValue(f), R(f.enabled);
    },
    onError: (f) => {
      l.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${f.message}` }));
    }
  }), Fe(() => {
    r(null);
  }, [c]);
  const w = async (f) => {
    n(!0);
    try {
      await v.system.updateLdapSettings(f), l.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      l.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      n(!1);
    }
  }, { run: z, loading: k } = A(async (f) => {
    const J = await a.validateFields();
    return await v.system.testLdapConnection({
      ...f,
      ...J
    });
  }, {
    onSuccess: (f) => {
      r(f);
    },
    onError: (f) => {
      l.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${f.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      o,
      {
        form: a,
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (f) => R(f) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: g, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: g, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: g, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(V.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: g, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: g, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: g, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: g, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: g, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(V, { type: "number", defaultValue: 15, disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(Je, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(de, { disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !g })
            }
          ),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !g,
                style: { marginLeft: 8 },
                onClick: () => d(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ce, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !g,
                style: { marginLeft: 8 },
                onClick: () => {
                  p(!0);
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
        open: c,
        onCancel: () => d(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            o,
            {
              form: j,
              layout: "vertical",
              onFinish: z,
              children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V, { disabled: !g })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !g })
                  }
                ),
                /* @__PURE__ */ e.jsxs(o.Item, { children: [
                  /* @__PURE__ */ e.jsx(ce, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { disabled: !g, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
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
          /* @__PURE__ */ e.jsx(ye, { spinning: k, children: /* @__PURE__ */ e.jsx(Yt, { active: k, loading: k, children: i && (i.user ? /* @__PURE__ */ e.jsxs(re, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(re.Item, { label: "Username", span: 3, children: i.user.username }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "Email", span: 3, children: i.user.email }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "FullName", span: 3, children: i.user.full_name }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "CreatedAt", span: 3, children: i.user.created_at }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "UpdatedAt", span: 3, children: i.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            es,
            {
              direction: "vertical",
              current: (P = i.message) == null ? void 0 : P.findIndex((f) => !f.success),
              status: (S = i.message) != null && S.find((f) => !f.success) ? "error" : "finish",
              items: (q = i.message) == null ? void 0 : q.map((f) => ({
                status: f.success ? "finish" : "error",
                title: f.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      Ks,
      {
        visible: u,
        onCancel: () => p(!1),
        fetchItems: () => v.system.importLdapUsers({}),
        importItems: (f) => v.system.importLdapUsers({ user_dn: f }),
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
          render: (f, J, Y, K) => K ? /* @__PURE__ */ e.jsx(ye, { indicator: /* @__PURE__ */ e.jsx(ds, { spin: !0 }) }) : f ? /* @__PURE__ */ e.jsx(us, { twoToneColor: "#52c41a" }) : J.id ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ne, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Qs = () => {
  const { message: l } = me.useApp(), { t } = Z("system"), { t: a } = Z("common"), [s] = o.useForm(), [n, i] = y(null), [r, c] = y(!1), [d] = o.useForm(), [u, p] = y(!1), { data: j } = A(v.system.getSmtpSettingFields), { loading: g } = A(v.system.getSmtpSettings, {
    onSuccess: (S) => {
      s.setFieldsValue(S), p(S.enabled);
    },
    onError: (S) => {
      l.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${S.message}` }));
    }
  });
  Fe(() => {
    i(null);
  }, [r]);
  const { run: R, loading: w } = A(({ port: S, ...q }) => v.system.updateSmtpSettings({ ...q, port: Number(S) }), {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (S) => {
      l.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${S.message}` }));
    }
  }), { run: z, loading: k } = A(async (S) => {
    const { port: q, ...f } = await s.validateFields();
    return await v.system.testSmtpConnection({
      ...S,
      ...f,
      port: Number(q)
    });
  }, {
    onSuccess: (S) => {
      i(S);
    },
    onError: (S) => {
      l.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${S.message}` }));
    },
    manual: !0
  }), P = (S) => {
    switch (S.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(oe, { style: { width: "100%" }, disabled: !u, min: S.min, max: S.max, step: S.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(oe, { style: { width: "100%" }, disabled: !u, min: 0, max: 100, step: S.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx(B, { mode: "tags", tokenSeparators: [","], disabled: !u });
      case "enum":
        return /* @__PURE__ */ e.jsx(B, { disabled: !u, options: S.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Ut, { theme: "snow", readOnly: !u });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(V, { disabled: !u });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ye, { spinning: g, children: /* @__PURE__ */ e.jsxs(
      o,
      {
        form: s,
        layout: "vertical",
        onFinish: R,
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
              children: /* @__PURE__ */ e.jsx(de, { onChange: (S) => p(S) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: u, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: u, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { type: "number", disabled: !u, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: u, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !u, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: u, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Be.Group, { disabled: !u, children: [
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
                { required: u, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !u, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.adminEmails", { defaultValue: "Admin Emails" }),
              name: "admin_emails",
              tooltip: t("settings.smtp.adminEmailsTooltip", { defaultValue: "Email addresses that receive admin notifications." }),
              children: /* @__PURE__ */ e.jsx(
                B,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !u,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(Je, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (j || []).map((S) => /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t(S.label_key || `settings.smtp.${S.key}`, { defaultValue: S.key }),
              name: S.key,
              tooltip: S.tooltip_key ? t(S.tooltip_key, { defaultValue: "" }) : void 0,
              children: P(S)
            },
            S.key
          )),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: w, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              E,
              {
                onClick: () => c(!0),
                disabled: !u || k,
                loading: k,
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
        onCancel: () => c(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => c(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(E, { type: "primary", loading: k, onClick: () => d.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: d,
            layout: "vertical",
            onFinish: (S) => z(S),
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
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: "test@example.com" })
                }
              ),
              n && /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: n.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: n.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, Zs = () => {
  const { message: l } = me.useApp(), { t, i18n: a } = Z("system"), { t: s } = Z("common"), [n] = o.useForm(), { fetchSiteConfig: i, currentOrgId: r } = ft(), { user: c } = Fs(), d = o.useWatch("enable_multi_org", n), u = o.useWatch("default_organization_id", n), p = be(() => {
    var J;
    const f = (J = c == null ? void 0 : c.organizations) == null ? void 0 : J.find((Y) => Y.id === r);
    return f != null && f.name ? `${f.name} (${r})` : r || "";
  }, [c == null ? void 0 : c.organizations, r]), j = be(() => {
    var J;
    const f = (J = c == null ? void 0 : c.organizations) == null ? void 0 : J.find((Y) => Y.id === u);
    return f != null && f.name ? `${f.name} (${u})` : u || "";
  }, [c == null ? void 0 : c.organizations, u]), { loading: g, data: R, refresh: w } = A(v.system.getSystemBaseSettings, {
    onSuccess: (f) => {
      n.setFieldsValue(f);
    },
    onError: (f) => {
      l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", f);
    }
  }), { loading: z, run: k } = A(v.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: async () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), w(), await i();
    },
    onError: (f) => {
      l.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", f);
    }
  }), { loading: P, run: S } = A(v.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      l.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (f) => {
      l.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", f);
    }
  }), q = (f) => {
    k(f);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: n,
      layout: "vertical",
      onFinish: q,
      initialValues: R,
      children: [
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(It, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }, ...Ts.map((f) => ({
          key: f.lang,
          label: a.language !== f.lang ? s(`language.${f.lang}`, { defaultValue: f.label, lang: f.label }) : f.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: ["name_i18n", f.lang], children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(V, {}) }),
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
        /* @__PURE__ */ e.jsx(o.Item, { name: "default_organization_id", hidden: !0, children: /* @__PURE__ */ e.jsx(V, {}) }),
        !d && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.defaultOrganization", { defaultValue: "Default Organization" }),
            tooltip: t("settings.base.defaultOrganizationTooltip", {
              defaultValue: "Used when multi-organization is disabled. Switching multi-organization off sets this to the currently selected organization."
            }),
            children: /* @__PURE__ */ e.jsx(V, { value: j, disabled: !0 })
          }
        ),
        d && p && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.currentOrganization", { defaultValue: "Current Organization" }),
            tooltip: t("settings.base.currentOrganizationTooltip", {
              defaultValue: "If you disable multi-organization, this organization will become the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(V, { value: p, disabled: !0 })
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
              loading: z,
              icon: /* @__PURE__ */ e.jsx(qe, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => w(),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(ce, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            At,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: s("ok", { defaultValue: "OK" }),
              cancelText: s("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => S(),
              children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(cs, {}), loading: P, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, Xs = Qe(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: jt } = V, Ys = () => {
  var x;
  const { message: l } = me.useApp(), { t } = Z("ai"), { t: a } = Z("common"), s = Se(), [n] = o.useForm(), [i, r] = y(!1), [c, d] = y(null), [u, p] = y(""), [j, g] = y(""), { loading: R, data: w } = A(
    () => v.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (m) => {
        l.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", m);
      }
    }
  ), z = be(() => w == null ? void 0 : w.find((m) => m.provider === j), [w, j]), { loading: k, data: P, refresh: S } = A(
    () => v.ai.listAiModels({ current: 1, page_size: 100, search: u }),
    {
      refreshDeps: [u],
      onError: (m) => {
        l.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", m);
      }
    }
  ), { loading: q, run: f } = A(
    ({ config: m, ...T }) => v.ai.createAiModel({ config: m ?? {}, ...T }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), r(!1), n.resetFields(), S();
      },
      onError: (m) => {
        l.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", m);
      }
    }
  ), { loading: J, run: Y } = A(
    ({ id: m, data: T }) => v.ai.updateAiModel({ id: m }, T),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), r(!1), n.resetFields(), d(null), S();
      },
      onError: (m) => {
        l.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", m);
      }
    }
  ), { runAsync: K } = A(
    (m) => v.ai.deleteAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), S();
      },
      onError: (m) => {
        l.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", m);
      }
    }
  ), { runAsync: te } = A(
    (m) => v.ai.testAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (m) => {
        l.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", m);
      }
    }
  ), { runAsync: G } = A(
    (m) => v.ai.setDefaultAiModel({ id: m }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), S();
      },
      onError: (m) => {
        l.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", m);
      }
    }
  ), H = () => {
    d(null), g(""), n.resetFields(), r(!0);
  }, _ = (m) => {
    d(m), g(m.provider);
    const T = m.config || {}, U = {
      name: m.name,
      description: m.description,
      provider: m.provider,
      is_default: m.is_default,
      config: T,
      // Spread config fields to form
      status: m.status,
      system_prompt: m.system_prompt ?? "",
      max_chat_tokens: m.max_chat_tokens ?? 0,
      max_chat_iterations: m.max_chat_iterations ?? 0
    };
    n.setFieldsValue(U), r(!0);
  }, O = async (m) => {
    d(null), g(m.provider), n.resetFields();
    try {
      const T = await v.ai.getAiModel({ id: m.id }), U = { ...T.config || {} };
      "api_key" in U && (U.api_key = ""), n.setFieldsValue({
        name: `${T.name} (copy)`,
        description: T.description,
        provider: T.provider,
        config: U,
        is_default: !1,
        status: "enabled",
        system_prompt: T.system_prompt ?? "",
        max_chat_tokens: T.max_chat_tokens ?? 0,
        max_chat_iterations: T.max_chat_iterations ?? 0
      }), r(!0);
    } catch {
      l.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, L = (m) => {
    g(m), n.setFieldValue("config", void 0);
  }, N = (m) => {
    const T = m.config ?? {}, U = {
      name: m.name,
      description: m.description,
      provider: m.provider,
      config: T,
      is_default: m.is_default,
      status: m.status,
      system_prompt: m.system_prompt ?? "",
      max_chat_tokens: m.max_chat_tokens ?? 0,
      max_chat_iterations: m.max_chat_iterations ?? 0
    };
    c ? Y({ id: c.id, data: U }) : f(U);
  }, C = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (m, T) => /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx("span", { children: m }),
        T.is_default && /* @__PURE__ */ e.jsx(st, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(ms, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (m) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: m.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (m) => /* @__PURE__ */ e.jsx(ne, { color: m === "enabled" ? "green" : "red", children: m === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (m, T) => /* @__PURE__ */ e.jsx(Pe, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(ps, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => te(T.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(fs, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => G(T.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => _(T)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(Et, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => O(T)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => K(T.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(We, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(we, { children: /* @__PURE__ */ e.jsx(
        V.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (m) => p(m),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(we, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(zt, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(ve, {}),
            onClick: S,
            loading: k,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Re, {}),
            onClick: H,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Ae,
      {
        columns: C,
        dataSource: (P == null ? void 0 : P.data) || [],
        loading: k,
        rowKey: "id",
        pagination: {
          total: (P == null ? void 0 : P.total) || 0,
          current: (P == null ? void 0 : P.current) || 1,
          pageSize: (P == null ? void 0 : P.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (m, T) => a("pagination.total", {
            defaultValue: `${T[0]}-${T[1]} of ${m} items`,
            start: T[0],
            end: T[1],
            total: m
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: c ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: i,
        onCancel: () => {
          r(!1), n.resetFields(), d(null);
        },
        footer: null,
        width: ((x = z == null ? void 0 : z.ui_schema) == null ? void 0 : x["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: N,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(V, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      jt,
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
                      B,
                      {
                        loading: R,
                        placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: L,
                        value: j,
                        options: w == null ? void 0 : w.map((m) => ({
                          label: m.name,
                          value: m.provider
                        }))
                      }
                    )
                  }
                ),
                z && /* @__PURE__ */ e.jsx(o.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(Ge, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(
                  Xs,
                  {
                    name: "config",
                    schema: z.config_schema,
                    uiSchema: z.ui_schema
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
                      jt,
                      {
                        rows: 4,
                        placeholder: t("models.systemPromptPlaceholder", {
                          defaultValue: "Enter system prompt (optional)"
                        })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsxs(We, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(we, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_tokens",
                      label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: t("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(we, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_iterations",
                      label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: t("models.maxChatIterationsHelp", {
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
                    label: t("models.setAsDefault", { defaultValue: "Set as default model" }),
                    children: /* @__PURE__ */ e.jsx(de, {})
                  }
                ),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: q || J,
                    children: c ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      r(!1), n.resetFields(), d(null), g("");
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
}, el = Qe(() => import("./json-schema-config-form.js").then((l) => ({
  default: l.JsonSchemaConfigFormItem
}))), { TextArea: tl } = V, sl = () => {
  var je;
  const { message: l } = me.useApp(), { t } = Z("system"), { t: a } = Z("common"), s = Se(), [n] = o.useForm(), [i, r] = y(!1), [c, d] = y(null), [u, p] = y(""), [j, g] = y(!1), [R, w] = y(null), [z, k] = y(""), [P, S] = y(!1), [q, f] = y([]), [J, Y] = y(), [K, te] = y(null), { loading: G, data: H, refresh: _ } = A(
    () => v.system.listToolSets({ current: 1, page_size: 100, search: u, type: J }),
    {
      refreshDeps: [u, J],
      onError: (b) => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", b);
      }
    }
  ), { loading: O, data: L } = A(
    () => v.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (b) => {
        l.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", b);
      }
    }
  ), N = be(() => L == null ? void 0 : L.find((b) => b.tool_set_type === z), [L, z]), { loading: C, run: x } = A(
    (b) => v.system.createToolSet({
      ...b,
      type: b.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), r(!1), n.resetFields(), _();
      },
      onError: (b) => {
        l.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", b);
      }
    }
  ), { loading: m, run: T } = A(
    ({ id: b, data: $ }) => v.system.updateToolSet({ id: b }, {
      ...$,
      type: $.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), r(!1), n.resetFields(), d(null), _();
      },
      onError: (b) => {
        l.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", b);
      }
    }
  ), { run: U } = A(
    (b) => v.system.deleteToolSet({ id: b }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), _();
      },
      onError: (b) => {
        l.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", b);
      }
    }
  ), { runAsync: X } = A(
    (b) => v.system.testToolSet({ id: b }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (b) => {
        l.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", b);
      }
    }
  ), { loading: pe, runAsync: Ve } = A(
    (b) => v.system.getToolSetTools({ id: b }),
    {
      manual: !0,
      onSuccess: (b) => {
        f(b || []), S(!0);
      },
      onError: (b) => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", b);
      }
    }
  ), Ee = xe(
    async (b, $) => {
      te(b.id);
      try {
        await v.system.updateToolSetStatus(
          { id: b.id },
          { status: $ ? "enabled" : "disabled" }
        ), l.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), _();
      } catch (I) {
        l.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", I);
      } finally {
        te(null);
      }
    },
    [t, _]
  ), ze = () => {
    d(null), n.resetFields(), k(""), r(!0);
  }, Le = (b) => {
    d(b), k(b.type);
    const $ = { ...b };
    n.setFieldsValue($), r(!0);
  }, Te = (b) => {
    k(b), n.setFieldValue("config", {});
  }, _e = (b) => {
    c ? T({ id: c.id, data: b }) : x(b);
  }, Ce = (b) => {
    U(b);
  }, F = (b) => {
    w(b), g(!0);
  }, ie = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (b, $) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: b }),
        $.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (b) => /* @__PURE__ */ e.jsx(ne, { color: "blue", children: b.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (b, $) => {
        const I = $.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: I ? "green" : "red", children: I ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              st,
              {
                title: I ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: I,
                    loading: K === $.id,
                    onChange: (M) => void Ee($, M)
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
      render: (b, $) => /* @__PURE__ */ e.jsx(Pe, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(zt, {}),
          disabled: $.status !== "enabled",
          onClick: async () => s(`/system/settings/toolsets/${$.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(gs, {}),
          disabled: $.status !== "enabled",
          onClick: async () => X($.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(dt, {}),
          permission: "system:toolsets:view",
          disabled: $.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => Ve($.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(hs, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => F($.config),
          disabled: !$.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: $.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          onClick: async () => Le($),
          disabled: !!$.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          permission: "system:toolsets:delete",
          tooltip: $.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : a("delete", { defaultValue: "Delete" }),
          onClick: async () => Ce($.id),
          danger: !0,
          disabled: !!$.is_preset,
          confirm: $.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => Ce($.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(We, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(we, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (b) => p(b),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          B,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: J,
            onChange: (b) => Y(b),
            options: L == null ? void 0 : L.map((b) => ({
              label: b.name,
              value: b.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(B.Option, { value: "", children: "All" }),
              L == null ? void 0 : L.map((b) => /* @__PURE__ */ e.jsx(B.Option, { value: b.tool_set_type, children: b.name }, b.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(we, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(ve, {}),
            onClick: _,
            loading: G,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Re, {}),
            onClick: ze,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      Ae,
      {
        columns: ie,
        dataSource: (H == null ? void 0 : H.data) || [],
        loading: G,
        rowKey: "id",
        pagination: {
          total: (H == null ? void 0 : H.total) || 0,
          current: (H == null ? void 0 : H.current) || 1,
          pageSize: (H == null ? void 0 : H.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (b, $) => a("pagination.total", {
            defaultValue: `${$[0]}-${$[1]} of ${b} items`,
            start: $[0],
            end: $[1],
            total: b
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: c ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          r(!1), n.resetFields(), d(null), k("");
        },
        footer: null,
        width: ((je = N == null ? void 0 : N.ui_schema) == null ? void 0 : je["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: _e,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: t("settings.toolsets.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                    children: /* @__PURE__ */ e.jsx(V, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: t("settings.toolsets.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      tl,
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
                      B,
                      {
                        loading: O,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: Te,
                        value: z,
                        options: L == null ? void 0 : L.map((b) => ({
                          label: b.name,
                          value: b.tool_set_type
                        }))
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(Ge, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(
                  el,
                  {
                    name: "config",
                    schema: N == null ? void 0 : N.config_schema,
                    uiSchema: N == null ? void 0 : N.ui_schema
                  }
                ) }),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: C || m,
                    children: c ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    onClick: () => {
                      r(!1), n.resetFields(), d(null), k("");
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
        onCancel: () => g(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => g(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(R, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: P,
        onCancel: () => S(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => S(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: pe ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ve, { style: { fontSize: 24 }, spin: !0 }) }) : q.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : q.map((b, $) => {
          var I, M, se;
          return /* @__PURE__ */ e.jsx(
            ae,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(W, { children: [
                /* @__PURE__ */ e.jsx(dt, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((I = b.function) == null ? void 0 : I.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(We, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(we, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((M = b.function) == null ? void 0 : M.description) || "-" })
                ] }),
                ((se = b.function) == null ? void 0 : se.parameters) && /* @__PURE__ */ e.jsxs(we, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(b.function.parameters, null, 2) })
                ] })
              ] })
            },
            $
          );
        }) })
      }
    )
  ] });
}, { TextArea: bt } = V;
function ll(l, t) {
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
    const c = (r.tools || []).map((d) => d.name);
    if (i.tool_name === "*") {
      a[i.toolset_id] = [...c];
      continue;
    }
    c.includes(i.tool_name) ? (a[i.toolset_id] || (a[i.toolset_id] = []), a[i.toolset_id].includes(i.tool_name) || a[i.toolset_id].push(i.tool_name)) : s.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
  }
  return { selections: a, extraPatterns: s };
}
function al(l, t) {
  const a = [], s = /* @__PURE__ */ new Set();
  for (const [n, i] of Object.entries(l))
    for (const r of i) {
      const c = `${n}|${r}`;
      s.has(c) || (s.add(c), a.push({ toolset_id: n, tool_name: r }));
    }
  for (const n of t) {
    const i = n.toolset_id.trim(), r = n.tool_name.trim();
    if (!i || !r)
      continue;
    const c = `${i}|${r}`;
    s.has(c) || (s.add(c), a.push({ toolset_id: i, tool_name: r }));
  }
  return a;
}
function Jt(l, t) {
  const a = t.trim();
  return !a || l.some((s) => s.value === a) ? l : [...l, { value: a, label: a }];
}
function il(l, t, a, s) {
  const i = [{ value: "*", label: s }], r = /* @__PURE__ */ new Set(["*"]), c = (d, u) => {
    r.has(d) || (r.add(d), i.push({
      value: d,
      label: u ? `${d} — ${u}` : d
    }));
  };
  if (t && t !== "*") {
    const d = l.find((u) => u.id === t);
    for (const u of (d == null ? void 0 : d.tools) || [])
      c(u.name, u.description);
  } else
    for (const d of l)
      for (const u of d.tools || [])
        c(u.name, u.description);
  return Jt(i, a);
}
const nl = () => {
  const { message: l } = me.useApp(), { t } = Z("system"), { t: a } = Z("common"), s = Se(), { enableSkillToolBinding: n } = ft(), [i] = o.useForm(), [r, c] = y(""), [d, u] = y(), [p, j] = y("user"), [g, R] = y(!1), [w, z] = y(null), [k, P] = y(null), [S, q] = y(!1), [f] = o.useForm(), [J, Y] = y(!1), [K, te] = y(null), [G, H] = y([]), [_, O] = y({}), [L, N] = y([]), [C, x] = y(!1), m = be(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...G.map((h) => ({
      value: h.id,
      label: `${h.name} (${h.id})`
    }))
  ], [G, t]), T = xe(() => {
    H([]), O({}), N([]);
  }, []), { loading: U, data: X, refresh: pe } = A(
    () => v.system.listSkills({
      current: 1,
      page_size: 100,
      search: r || void 0,
      domain: d,
      is_preset: p === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [r, d, p],
      onError: () => {
        l.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Ve = [] } = A(() => v.system.listSkillDomains()), Ee = (X == null ? void 0 : X.data) || [], ze = (X == null ? void 0 : X.total) || 0, { run: Le } = A(
    (h) => v.system.deleteSkill({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), pe();
      },
      onError: () => {
        l.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Te = xe(
    async (h, D) => {
      te(h.id);
      try {
        await v.system.updateSkillStatus({ id: h.id }, { status: D ? "enabled" : "disabled" }), l.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), pe();
      } catch {
        l.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        te(null);
      }
    },
    [t, pe]
  ), { loading: _e, run: Ce } = A(
    (h) => v.system.uploadSkill(h.body, h.file),
    {
      manual: !0,
      onSuccess: () => {
        l.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), q(!1), f.resetFields(), pe();
      },
      onError: () => {
        l.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), F = xe(
    async (h) => {
      var D;
      x(!0);
      try {
        const [Q, ue] = await Promise.all([
          v.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          v.system.listSkillAiToolBindings(
            { id: h, current: 1, page_size: 1e3 }
          )
        ]), ee = ((D = Q.data) == null ? void 0 : D.filter((Xt) => Xt.status === "enabled")) || [];
        H(ee);
        const { selections: le, extraPatterns: $e } = ll(ue.data || [], ee);
        O(le), N($e);
      } catch {
        l.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), T();
      } finally {
        x(!1);
      }
    },
    [T, t]
  );
  Fe(() => {
    !g || !(w != null && w.id) || !n || F(w.id);
  }, [g, w == null ? void 0 : w.id, n, F]);
  const ie = (h, D) => {
    O((Q) => ({ ...Q, [h]: D }));
  }, je = (h, D, Q) => {
    O((ue) => ({
      ...ue,
      [h]: Q ? [...D] : []
    }));
  }, b = () => {
    z(null), P(null), i.resetFields(), T(), R(!0);
  }, $ = (h) => {
    z(h), P(null), i.setFieldsValue({
      name: h.name,
      description: h.description,
      category: h.category,
      domain: h.domain
    }), T(), R(!0);
  }, I = (h) => {
    z(null), P(h), i.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: h.name, defaultValue: "{{name}} (copy)" }),
      description: h.description,
      category: h.category,
      domain: h.domain
    }), T(), R(!0);
  }, M = () => {
    i.validateFields().then(async (h) => {
      Y(!0);
      try {
        if (w) {
          const D = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          };
          if (await v.system.updateSkill({ id: w.id }, D), n) {
            const Q = al(_, L);
            await v.system.replaceSkillAiToolBindings(
              { id: w.id },
              { bindings: Q }
            );
          }
          l.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (k) {
          const D = {
            source_id: k.id,
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          }, { id: Q } = await v.system.cloneSkill(D);
          l.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), R(!1), P(null), i.resetFields(), T(), pe(), Q && s(`/system/settings/skills/${Q}/edit`);
          return;
        } else {
          const D = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? "",
            content: h.content ?? ""
          };
          await v.system.createSkill(D), l.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        R(!1), z(null), P(null), i.resetFields(), T(), pe();
      } catch {
        l.error(
          w ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : k ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        Y(!1);
      }
    });
  }, se = () => {
    var ee, le;
    const h = (ee = f.getFieldValue("file")) == null ? void 0 : ee.fileList, D = ((le = h == null ? void 0 : h[0]) == null ? void 0 : le.originFileObj) ?? (h == null ? void 0 : h[0]);
    if (!D) {
      l.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const Q = f.getFieldValue("category"), ue = f.getFieldValue("domain");
    Ce({ body: { category: Q, domain: ue }, file: D });
  }, ge = n && w, Ze = ge ? 720 : 560, Qt = !w && !k, Zt = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (h, D) => /* @__PURE__ */ e.jsxs(W, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: h }),
        D.is_preset ? /* @__PURE__ */ e.jsx(ne, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (h) => h ? /* @__PURE__ */ e.jsx(ne, { children: h }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (h) => h ? /* @__PURE__ */ e.jsx(ne, { color: "blue", children: h }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (h, D) => {
        const Q = D.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ne, { color: Q ? "green" : "red", children: Q ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              st,
              {
                title: Q ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  de,
                  {
                    size: "small",
                    checked: Q,
                    loading: K === D.id,
                    onChange: (ue) => void Te(D, ue)
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
      render: (h, D) => /* @__PURE__ */ e.jsx(
        Pe,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Ye, {}),
              tooltip: D.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${D.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!D.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Lt, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${D.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              tooltip: D.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => $(D),
              permission: "system:skills:update",
              disabled: !!D.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(Et, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => I(D),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              tooltip: D.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!D.is_preset,
              confirm: D.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: a("confirm", { defaultValue: "Confirm" }),
                cancelText: a("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => Le(D.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(We, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(we, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: a("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: c,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          B,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: d,
            onChange: u,
            options: Ve.map((h) => ({ value: h, label: h }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          Be.Group,
          {
            optionType: "button",
            value: p,
            onChange: (h) => j(h.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(we, { children: /* @__PURE__ */ e.jsxs(W, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => pe(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: b, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(xt, {}), onClick: () => q(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsx(
        Ae,
        {
          rowKey: "id",
          loading: U,
          columns: Zt,
          dataSource: Ee,
          pagination: { total: ze, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          title: w ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : k ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: g,
          onOk: M,
          onCancel: () => {
            R(!1), z(null), P(null), T();
          },
          confirmLoading: J,
          width: Ze,
          children: /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(bt, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: Ve.map((h) => ({ value: h, label: h })) }) }),
            Qt && /* @__PURE__ */ e.jsx(o.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(bt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            ge && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(ye, { spinning: C, children: G.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(W, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: G.map((h) => {
                const D = (h.tools || []).map((le) => le.name), Q = _[h.id] || [], ue = D.length > 0 && Q.length === D.length, ee = Q.length > 0 && Q.length < D.length;
                return /* @__PURE__ */ e.jsx(
                  ae,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        it,
                        {
                          checked: ue,
                          indeterminate: ee,
                          onChange: (le) => je(h.id, D, le.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: h.name })
                    ] }),
                    extra: h.description ? /* @__PURE__ */ e.jsx("span", { children: h.description }) : void 0,
                    children: (h.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(it.Group, { style: { width: "100%" }, value: Q, onChange: (le) => ie(h.id, le), children: /* @__PURE__ */ e.jsx(W, { direction: "vertical", style: { width: "100%" }, children: (h.tools || []).map((le) => /* @__PURE__ */ e.jsx(it, { value: le.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
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
                  h.id
                );
              }) }),
              /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                  defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                }) }),
                /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, children: [
                  L.map((h, D) => /* @__PURE__ */ e.jsxs(
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
                          ht,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: h.toolset_id,
                            options: Jt(m, h.toolset_id),
                            filterOption: (Q, ue) => {
                              const ee = ue;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(Q.toLowerCase());
                            },
                            onChange: (Q) => {
                              const ue = typeof Q == "string" ? Q : "";
                              N(
                                (ee) => ee.map((le, $e) => $e === D ? { ...le, toolset_id: ue } : le)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          ht,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: h.tool_name,
                            options: il(
                              G,
                              h.toolset_id,
                              h.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (Q, ue) => {
                              const ee = ue;
                              return `${(ee == null ? void 0 : ee.value) ?? ""} ${(ee == null ? void 0 : ee.label) ?? ""}`.toLowerCase().includes(Q.toLowerCase());
                            },
                            onChange: (Q) => {
                              const ue = typeof Q == "string" ? Q : "";
                              N(
                                (ee) => ee.map((le, $e) => $e === D ? { ...le, tool_name: ue } : le)
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
                            onClick: () => N((Q) => Q.filter((ue, ee) => ee !== D)),
                            children: a("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    D
                  )),
                  /* @__PURE__ */ e.jsx(E, { type: "dashed", onClick: () => N((h) => [...h, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
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
        fe,
        {
          title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
          open: S,
          onOk: se,
          onCancel: () => q(!1),
          confirmLoading: _e,
          children: /* @__PURE__ */ e.jsxs(o, { form: f, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(ts, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(xt, {}), children: a("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(B, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: Ve.map((h) => ({ value: h, label: h })) }) })
          ] })
        }
      )
    ] })
  ] });
}, ol = () => {
  const { message: l } = me.useApp(), t = Se(), { t: a } = Z("system"), { t: s } = Z("task"), { t: n } = Z("common"), [i] = o.useForm(), { data: r } = A(v.system.listLogStorageBackends), { data: c } = A(v.system.getTaskSettingFields), d = (r ?? []).map((k) => ({
    value: k.id,
    label: a(`settings.task.logStorage.${k.id}`, { defaultValue: k.name })
  })), { loading: u, refresh: p } = A(v.system.getTaskSettings, {
    onSuccess: (k) => {
      k && i.setFieldsValue(k);
    },
    onError: () => {
      l.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: j, run: g } = A(v.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      l.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), p();
    },
    onError: () => {
      l.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), R = (k) => {
    g(k);
  }, w = (k) => {
    switch (k.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          oe,
          {
            style: { width: "100%" },
            addonAfter: k.key.includes("retention_days") ? a("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(oe, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(de, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx(B, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx(B, { options: k.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(Ut, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(V, {});
    }
  }, z = (k) => k.value_type === "int" || k.value_type === "number" || k.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(ye, { spinning: u, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: R,
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
              B,
              {
                options: d,
                placeholder: a("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: r === void 0
              }
            )
          }
        ),
        (c ?? []).map((k) => /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: k.key,
            label: a(`settings.task.fields.${k.key}`, { defaultValue: k.key }),
            rules: z(k),
            valuePropName: k.value_type === "bool" ? "checked" : "value",
            children: w(k)
          },
          k.key
        )),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: j, icon: /* @__PURE__ */ e.jsx(qe, {}), children: n("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(E, { onClick: () => p(), icon: /* @__PURE__ */ e.jsx(ve, {}), children: n("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Ot, {}), onClick: () => t("/tasks"), children: s("listTitle", { defaultValue: "Task List" }) }),
          /* @__PURE__ */ e.jsx(ce, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(xs, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { Text: rl } = mt, dl = [
  { value: "anonymous", label: "anonymous" },
  { value: "user", label: "user" },
  { value: "service_account", label: "service_account" }
], nt = { marginBottom: 0 }, ul = ({ onResetSubject: l }) => {
  const { t } = Z("system"), { t: a } = Z("common"), s = [
    { key: "anonymous", label: t("settings.rateLimit.anonymous", { defaultValue: "Anonymous (IP)" }) },
    { key: "user", label: t("settings.rateLimit.user", { defaultValue: "User" }) },
    { key: "service_account", label: t("settings.rateLimit.serviceAccount", { defaultValue: "Service account" }) }
  ], n = [
    { title: t("settings.rateLimit.subjectType", { defaultValue: "Subject" }), dataIndex: "label", width: 180 },
    {
      title: `${t("settings.rateLimit.rate", { defaultValue: "Rate" })} / ${t("settings.rateLimit.period", { defaultValue: "Period" })}`,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { style: nt, children: /* @__PURE__ */ e.jsxs(W.Compact, { children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "rate"], rules: [{ required: !0 }], noStyle: !0, children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: 88 } }) }),
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "period"], noStyle: !0, children: /* @__PURE__ */ e.jsx(V, { placeholder: "1m", style: { width: 72 } }) })
      ] }) })
    },
    {
      title: t("settings.rateLimit.burst", { defaultValue: "Burst" }),
      width: 120,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "burst"], style: nt, children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: "100%" } }) })
    },
    {
      title: `${t("settings.rateLimit.quota", { defaultValue: "Quota" })} / ${t("settings.rateLimit.quotaPeriod", { defaultValue: "Quota period" })}`,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { style: nt, children: /* @__PURE__ */ e.jsxs(W.Compact, { children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "quota"], noStyle: !0, children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: 100 }, placeholder: "0" }) }),
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "quota_period"], noStyle: !0, children: /* @__PURE__ */ e.jsx(V, { placeholder: "1d", style: { width: 72 } }) })
      ] }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      width: 64,
      render: (i, r) => /* @__PURE__ */ e.jsx(Pe, { actions: [
        {
          key: "reset",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(ut, {}),
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
    Ae,
    {
      size: "small",
      pagination: !1,
      rowKey: "key",
      columns: n,
      dataSource: s
    }
  );
}, cl = () => {
  const { message: l } = me.useApp(), { t } = Z("system"), { t: a } = Z("common"), { hasPermission: s } = $t(), n = s("system:rate_limit:update"), [i] = o.useForm(), [r] = o.useForm(), [c, d] = y(!1), [u, p] = y(null), [j, g] = y({ current: 1, page_size: 10 }), [R, w] = y(""), { data: z, loading: k, refresh: P } = A(v.system.getRateLimitSettings, {
    onSuccess: (L) => i.setFieldsValue(L),
    onError: () => l.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }))
  }), { loading: S, run: q } = A(v.system.updateRateLimitSettings, {
    manual: !0,
    onSuccess: () => {
      l.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), P();
    },
    onError: (L) => l.error(L.message || t("settings.updateFailed", { defaultValue: "Failed to update settings" }))
  }), { data: f, loading: J, refresh: Y } = A(
    () => v.system.listRateLimitRules({ current: j.current, page_size: j.page_size, search: R || void 0 }),
    { refreshDeps: [j.current, j.page_size, R] }
  ), K = () => {
    p(null), r.resetFields(), r.setFieldsValue({ subject_type: "user", period: "1m", enabled: !0, method: "GET", quota: 0 }), d(!0);
  }, te = (L) => {
    p(L), r.setFieldsValue(L), d(!0);
  }, { run: G, loading: H } = A(
    async (L) => {
      const N = { ...L, enabled: L.enabled !== !1 };
      return u != null && u.id ? v.system.updateRateLimitRule({ id: u.id }, N) : v.system.createRateLimitRule(N);
    },
    {
      manual: !0,
      onSuccess: () => {
        l.success(a("success", { defaultValue: "Operation successful" })), d(!1), Y();
      },
      onError: (L) => l.error(L.message)
    }
  ), _ = async (L) => {
    try {
      await v.system.resetRateLimitCounters(L), l.success(t("settings.rateLimit.resetSuccess", { defaultValue: "Counters reset" }));
    } catch (N) {
      throw l.error(N instanceof Error ? N.message : t("settings.rateLimit.resetFailed", { defaultValue: "Failed to reset counters" })), N;
    }
  }, O = [
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
      render: (L, N) => /* @__PURE__ */ e.jsx(Pe, { actions: [
        {
          key: "edit",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          tooltip: a("edit", { defaultValue: "Edit" }),
          onClick: async () => {
            te(N);
          }
        },
        {
          key: "delete",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(Ie, {}),
          danger: !0,
          tooltip: a("delete", { defaultValue: "Delete" }),
          confirm: { title: t("settings.rateLimit.deleteConfirm", { defaultValue: "Delete this rule?" }) },
          onClick: async () => {
            await v.system.deleteRateLimitRule({ id: N.id }), Y();
          }
        },
        {
          key: "reset",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(ut, {}),
          tooltip: t("settings.rateLimit.resetRule", { defaultValue: "Reset counters" }),
          confirm: { title: t("settings.rateLimit.resetRuleConfirm", { defaultValue: "Reset counters for this rule?" }) },
          onClick: async () => {
            await _({
              scope: "rule",
              rule_id: N.id,
              subject_type: N.subject_type,
              subject_id: N.subject_id || ""
            });
          }
        }
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(ye, { spinning: k, children: [
    (z == null ? void 0 : z.memory_warn) && /* @__PURE__ */ e.jsx(
      Xe,
      {
        type: "warning",
        showIcon: !0,
        style: { marginBottom: 16 },
        message: t("settings.rateLimit.memoryWarn", { defaultValue: "Cluster mode with in-memory store: limits are per node. Use rate_limit.store=redis for cluster-wide limits." })
      }
    ),
    /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", onFinish: q, disabled: !n, children: [
      /* @__PURE__ */ e.jsxs(W, { wrap: !0, align: "center", style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: "enabled", label: t("settings.rateLimit.enabled", { defaultValue: "Enable rate limiting" }), valuePropName: "checked", style: { marginBottom: 0 }, children: /* @__PURE__ */ e.jsx(de, {}) }),
        /* @__PURE__ */ e.jsxs(rl, { type: "secondary", children: [
          t("settings.rateLimit.storeLabel", { defaultValue: "Store" }),
          ": ",
          (z == null ? void 0 : z.store) || "memory",
          " · ",
          t("settings.rateLimit.failOpen", { defaultValue: "Fail open" }),
          ": ",
          String((z == null ? void 0 : z.fail_open) ?? !0)
        ] })
      ] }),
      /* @__PURE__ */ e.jsx(Je, { children: t("settings.rateLimit.defaults", { defaultValue: "Default shared buckets" }) }),
      /* @__PURE__ */ e.jsx(
        ul,
        {
          onResetSubject: (L) => _({
            scope: "subject",
            subject_type: L,
            subject_id: "",
            rule_id: ""
          })
        }
      ),
      /* @__PURE__ */ e.jsx(ce, { permission: "system:rate_limit:update", children: /* @__PURE__ */ e.jsxs(W, { style: { marginTop: 12 }, children: [
        /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(qe, {}), loading: S, children: a("save", { defaultValue: "Save" }) }),
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => P(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(
          At,
          {
            title: t("settings.rateLimit.resetAllConfirm", { defaultValue: "Reset every rate-limit and quota counter? Currently blocked clients will be allowed immediately." }),
            onConfirm: () => _({
              scope: "global",
              subject_type: "anonymous",
              subject_id: "",
              rule_id: ""
            }),
            children: /* @__PURE__ */ e.jsx(E, { danger: !0, htmlType: "button", icon: /* @__PURE__ */ e.jsx(ut, {}), children: t("settings.rateLimit.resetAll", { defaultValue: "Reset all counters" }) })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(Je, { children: t("settings.rateLimit.routeRules", { defaultValue: "Route rules" }) }),
    /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(
        V.Search,
        {
          allowClear: !0,
          placeholder: a("search", { defaultValue: "Search" }),
          onSearch: (L) => {
            w(L), g((N) => ({ ...N, current: 1 }));
          },
          style: { width: 240 }
        }
      ),
      /* @__PURE__ */ e.jsx(ce, { permission: "system:rate_limit:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: K, children: a("create", { defaultValue: "Create" }) }) }),
      /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => Y(), children: a("refresh", { defaultValue: "Refresh" }) })
    ] }),
    /* @__PURE__ */ e.jsx(
      Ae,
      {
        rowKey: "id",
        loading: J,
        columns: O,
        dataSource: (f == null ? void 0 : f.data) || [],
        pagination: {
          current: (f == null ? void 0 : f.current) || j.current,
          pageSize: (f == null ? void 0 : f.page_size) || j.page_size,
          total: (f == null ? void 0 : f.total) || 0,
          onChange: (L, N) => g({ current: L, page_size: N })
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        open: c,
        title: u ? t("settings.rateLimit.editRule", { defaultValue: "Edit rule" }) : t("settings.rateLimit.createRule", { defaultValue: "Create rule" }),
        onCancel: () => d(!1),
        onOk: () => r.submit(),
        confirmLoading: H,
        destroyOnClose: !0,
        children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", onFinish: G, disabled: !n, children: [
          /* @__PURE__ */ e.jsx(o.Item, { name: "subject_type", label: t("settings.rateLimit.subjectType", { defaultValue: "Subject" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(B, { options: dl }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "subject_id", label: t("settings.rateLimit.subjectId", { defaultValue: "Subject ID" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: t("settings.rateLimit.subjectIdHint", { defaultValue: "Empty = all subjects of this type" }) }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "method", label: t("settings.rateLimit.method", { defaultValue: "Method" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "GET" }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "path", label: t("settings.rateLimit.path", { defaultValue: "Path" }), extra: t("settings.rateLimit.pathHint", { defaultValue: "Gin full path, e.g. /api/ai/chat/sessions/:sessionId. Empty = shared bucket." }), children: /* @__PURE__ */ e.jsx(V, {}) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "rate", label: t("settings.rateLimit.rate", { defaultValue: "Rate" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "period", label: t("settings.rateLimit.period", { defaultValue: "Period" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "1m" }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "burst", label: t("settings.rateLimit.burst", { defaultValue: "Burst" }), children: /* @__PURE__ */ e.jsx(oe, { min: 1, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "quota", label: t("settings.rateLimit.quota", { defaultValue: "Quota" }), children: /* @__PURE__ */ e.jsx(oe, { min: 0, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "quota_period", label: t("settings.rateLimit.quotaPeriod", { defaultValue: "Quota period" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "1d" }) }),
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
}, { TextArea: ml } = V, pl = /^[-_a-zA-Z0-9.]+$/, fl = () => {
  const { message: l, modal: t } = me.useApp(), a = Se(), { t: s, i18n: n } = Z("system"), { t: i } = Z("common"), r = (C) => {
    if (!C) return "-";
    const x = new Date(C);
    return Number.isNaN(x.getTime()) ? "-" : x.toLocaleString(n.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [c] = o.useForm(), [d, u] = y(!1), [p, j] = y(null), [g, R] = y(""), [w, z] = y(1), [k, P] = y(10), { loading: S, data: q, refresh: f } = A(
    () => As({ current: w, page_size: k, search: g }),
    {
      refreshDeps: [w, k, g],
      onError: (C) => {
        l.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", C);
      }
    }
  ), { loading: J, run: Y } = A(
    (C) => Es(C),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), u(!1), c.resetFields(), j(null), f();
      },
      onError: (C) => {
        l.error((C == null ? void 0 : C.err) || s("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: K, run: te } = A(
    ({ id: C, ...x }) => zs({ id: C }, x),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), u(!1), c.resetFields(), j(null), f();
      },
      onError: (C) => {
        l.error((C == null ? void 0 : C.err) || s("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: G } = A(
    (C) => Ls({ id: C }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(s("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), f();
      },
      onError: (C) => {
        l.error((C == null ? void 0 : C.err) || s("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), H = () => {
    j(null), c.resetFields(), c.setFieldsValue({ status: "active" }), u(!0);
  }, _ = (C) => {
    j(C), c.setFieldsValue({
      name: C.name,
      slug: C.slug,
      description: C.description,
      status: C.status
    }), u(!0);
  }, O = (C) => {
    t.confirm({
      title: s("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: s("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${C.name}"? This action cannot be undone.`
      }),
      onOk: () => G(C.id)
    });
  }, L = () => {
    c.validateFields().then((C) => {
      p ? te({ id: p.id, ...C }) : Y(C);
    });
  }, N = [
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
      render: (C) => r(C)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (C, x) => /* @__PURE__ */ e.jsx(
        Pe,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Lt, {}),
              onClick: async () => a(`/system/settings/organizations/${x.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              onClick: async () => _(x),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => O(x),
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
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: f, children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ce, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: H, children: s("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: s("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (C) => {
                R(C), z(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Ae,
            {
              columns: N,
              dataSource: (q == null ? void 0 : q.data) || [],
              loading: S,
              rowKey: "id",
              pagination: {
                current: w,
                pageSize: k,
                total: (q == null ? void 0 : q.total) || 0,
                showSizeChanger: !0,
                showTotal: (C, x) => i("pagination.total", {
                  defaultValue: `${x[0]}-${x[1]} of ${C} items`,
                  start: x[0],
                  end: x[1],
                  total: C
                }),
                onChange: (C, x) => {
                  z(C), P(x);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: p ? s("settings.organizations.edit", { defaultValue: "Edit Organization" }) : s("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: d,
            onOk: L,
            onCancel: () => {
              u(!1), c.resetFields(), j(null);
            },
            confirmLoading: J || K,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(o, { form: c, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "name",
                  label: s("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: s("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "slug",
                  label: s("settings.organizations.slug", { defaultValue: "Slug" }),
                  tooltip: s("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
                  rules: [{
                    pattern: pl,
                    message: s("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
                  }],
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: "my-org" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "description",
                  label: s("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(ml, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                o.Item,
                {
                  name: "status",
                  label: s("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(B, { children: [
                    /* @__PURE__ */ e.jsx(B.Option, { value: "active", children: s("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(B.Option, { value: "disabled", children: s("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, gl = ({
  transformItems: l = (t) => t
}) => {
  const { t } = Z("system"), a = Se(), s = Is(), r = s.hash.replace("#", "") || "base", { enableMultiOrg: c } = ft(), { hasPermission: d } = $t(), u = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(Zs, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Hs, {}),
      hidden: !d("system:security:update")
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Ws, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Gs, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Qs, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ai-models",
      label: t("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Ys, {}),
      hidden: !d("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: t("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(sl, {}),
      hidden: !d("system:toolsets:view")
    },
    {
      key: "skills",
      label: t("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(nl, {}),
      hidden: !d("system:skills:view")
    },
    {
      key: "task",
      label: t("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(ol, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "rate-limit",
      label: t("settings.tabs.rateLimit", { defaultValue: "Rate Limit" }),
      children: /* @__PURE__ */ e.jsx(cl, {}),
      hidden: !d("system:rate_limit:view") && !d("system:rate_limit:update")
    },
    // Only show organization tab if multi-org is enabled
    ...c ? [{
      key: "organizations",
      label: t("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(fl, {}),
      hidden: !d("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ae, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    It,
    {
      defaultActiveKey: r,
      onChange: (p) => {
        a(`${s.pathname}#${p}`);
      },
      items: l(u.filter((p) => !p.hidden), t)
    }
  ) });
}, na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gl
}, Symbol.toStringTag, { value: "Module" })), hl = () => {
  var Te, _e, Ce;
  const { message: l, modal: t } = me.useApp(), a = Se(), { id: s } = at(), { t: n } = Z("system"), { t: i } = Z("common"), [r] = o.useForm(), [c] = o.useForm(), [d, u] = y(!1), [p, j] = y(!1), [g, R] = y(null), [w, z] = y(""), [k, P] = y(1), [S, q] = y(10), { data: f, loading: J, refresh: Y } = A(
    () => Os({ id: s }),
    {
      ready: !!s,
      onError: (F) => {
        l.error(n("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", F);
      }
    }
  ), { data: K, loading: te, refresh: G } = A(
    () => Rs({ id: s, current: k, page_size: S, search: w }),
    {
      ready: !!s,
      refreshDeps: [s, k, S, w],
      onError: (F) => {
        l.error(n("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", F);
      }
    }
  ), { data: H, loading: _ } = A(
    () => Ds({ current: 1, page_size: 1e3 }),
    {
      ready: d
    }
  ), { data: O, loading: L } = A(
    () => qs({ organization_id: s, current: 1, page_size: 1e3 }),
    {
      ready: !!s
    }
  ), { loading: N, run: C } = A(
    (F) => Ps({ id: s }, F),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), u(!1), r.resetFields(), G();
      },
      onError: (F) => {
        l.error((F == null ? void 0 : F.err) || n("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: x, run: m } = A(
    (F) => Ms({ id: s, user_id: g.id }, F),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), j(!1), c.resetFields(), R(null), G();
      },
      onError: (F) => {
        l.error((F == null ? void 0 : F.err) || n("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: T } = A(
    (F) => Ns({ id: s, user_id: F }),
    {
      manual: !0,
      onSuccess: () => {
        l.success(n("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), G();
      },
      onError: (F) => {
        l.error((F == null ? void 0 : F.err) || n("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), U = () => {
    u(!0), r.resetFields();
  }, X = (F) => {
    var ie;
    R(F), c.setFieldsValue({
      role_ids: ((ie = F.organization_roles) == null ? void 0 : ie.map((je) => je.id)) || []
    }), j(!0);
  }, pe = (F) => {
    t.confirm({
      title: n("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: n("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${F.full_name || F.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => T(F.id)
    });
  }, Ve = () => {
    r.validateFields().then((F) => {
      C(F);
    });
  }, Ee = () => {
    c.validateFields().then((F) => {
      m(F);
    });
  }, ze = ((Te = H == null ? void 0 : H.data) == null ? void 0 : Te.filter((F) => {
    var ie;
    return !((ie = K == null ? void 0 : K.data) != null && ie.some((je) => je.id === F.id));
  })) || [], Le = [
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
      render: (F) => /* @__PURE__ */ e.jsx(ne, { color: F === "active" ? "green" : "default", children: F === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : F })
    },
    {
      title: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (F, ie) => {
        var je;
        return /* @__PURE__ */ e.jsx(W, { wrap: !0, children: ((je = ie.organization_roles) == null ? void 0 : je.map((b) => /* @__PURE__ */ e.jsx(ne, { children: b.name }, b.id))) || /* @__PURE__ */ e.jsx(ne, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (F, ie) => /* @__PURE__ */ e.jsx(
        Pe,
        {
          actions: [
            {
              key: "edit",
              label: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              onClick: async () => X(ie)
            },
            {
              key: "delete",
              label: n("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              danger: !0,
              onClick: async () => pe(ie)
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
              icon: /* @__PURE__ */ e.jsx(pt, {}),
              onClick: () => a("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            n("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            f == null ? void 0 : f.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => {
          Y(), G();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: J,
        children: /* @__PURE__ */ e.jsxs(re, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.name", { defaultValue: "Name" }), children: f == null ? void 0 : f.name }),
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.slug", { defaultValue: "Slug" }), children: (f == null ? void 0 : f.slug) || "-" }),
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: (f == null ? void 0 : f.status) === "active" ? "green" : "default", children: (f == null ? void 0 : f.status) === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : n("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(re.Item, { label: n("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (f == null ? void 0 : f.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ae,
      {
        title: n("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Re, {}), onClick: U, children: n("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(W, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: n("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (F) => {
                z(F), P(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Ae,
            {
              columns: Le,
              dataSource: (K == null ? void 0 : K.data) || [],
              loading: te,
              rowKey: "id",
              pagination: {
                current: k,
                pageSize: S,
                total: (K == null ? void 0 : K.total) || 0,
                showSizeChanger: !0,
                showTotal: (F) => i("pagination.total", { defaultValue: `Total ${F} items` }),
                onChange: (F, ie) => {
                  P(F), q(ie);
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
          u(!1), r.resetFields();
        },
        confirmLoading: N,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "user_id",
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: n("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                B,
                {
                  showSearch: !0,
                  placeholder: n("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: _,
                  filterOption: (F, ie) => ((ie == null ? void 0 : ie.label) ?? "").toLowerCase().includes(F.toLowerCase()),
                  options: ze.map((F) => ({
                    label: `${F.full_name || F.username} (${F.email})`,
                    value: F.id
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
                B,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: L,
                  options: ((_e = O == null ? void 0 : O.data) == null ? void 0 : _e.map((F) => ({
                    label: F.name,
                    value: F.id
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
        open: p,
        onOk: Ee,
        onCancel: () => {
          j(!1), c.resetFields(), R(null);
        },
        confirmLoading: x,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: c, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  value: (g == null ? void 0 : g.full_name) || (g == null ? void 0 : g.username),
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
                B,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: L,
                  options: ((Ce = O == null ? void 0 : O.data) == null ? void 0 : Ce.map((F) => ({
                    label: F.name,
                    value: F.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hl
}, Symbol.toStringTag, { value: "Module" })), xl = Qe(() => import("./markdown-viewer.js")), yl = gt(({ css: l }) => ({
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
})), { TextArea: Vt } = V, jl = (l) => l.toLowerCase().endsWith(".md");
function Wt(l) {
  return l.map((t) => {
    var a;
    return {
      key: t.path,
      title: t.name,
      isLeaf: !t.is_dir,
      icon: t.is_dir ? /* @__PURE__ */ e.jsx(Rt, {}) : /* @__PURE__ */ e.jsx(Pt, {}),
      children: (a = t.children) != null && a.length ? Wt(t.children) : void 0
    };
  });
}
function ot(l) {
  return l.includes("/") ? l.replace(/\/[^/]+$/, "") : "";
}
const bl = () => {
  const { message: l, modal: t } = me.useApp(), { styles: a } = yl(), { id: s } = at(), n = Se(), { t: i } = Z("system"), [r, c] = y(null), [d, u] = y(null), [p, j] = y(!1), [g, R] = y(""), [w, z] = y(!1), [k, P] = y([]), [S, q] = y(!1), [f, J] = y(!1), [Y, K] = y(""), [te] = o.useForm(), [G, H] = y(null), [_, O] = y(null), [L, N] = y(""), [C] = o.useForm(), { data: x } = A(
    () => s ? v.system.getSkill({ id: s }) : Promise.reject(new Error("No id")),
    { refreshDeps: [s], ready: !!s }
  ), { data: m, loading: T, refresh: U } = A(
    () => s ? v.system.listSkillFilesTree({ id: s }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [s],
      ready: !!s,
      onSuccess: (I) => {
        if (!r) {
          for (const M of I)
            if (!M.is_dir && M.name === "SKILL.md") {
              u(M.path), c(M.path), j(!1);
              return;
            }
          for (const M of I)
            if (!M.is_dir && M.name === "SKILLS.md") {
              u(M.path), c(M.path), j(!1);
              return;
            }
        }
      }
    }
  ), X = !!(x != null && x.is_preset), pe = be(() => Wt(m || []), [m]), Ve = p && d ? d : r ? ot(r) : "", { loading: Ee } = A(() => !s || !r ? Promise.reject(new Error("No id or selected file")) : v.system.getSkillFile({ id: s, path: r || "" }), {
    refreshDeps: [s, r],
    ready: !!s && !!r,
    onSuccess: (I) => {
      R(I.data);
    },
    onBefore: () => {
      R("");
    },
    onError: () => l.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), ze = () => {
    !s || !r || X || v.system.putSkillFile({ id: s, path: r }, g).then(() => {
      l.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), z(!1);
    }).catch(() => l.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, Le = (I, M) => {
    const se = String(M.node.key), ge = !M.node.isLeaf;
    u(se), j(ge), M.node.isLeaf ? c(se) : c(null);
  }, Te = (I) => {
    I.event.preventDefault(), H({
      path: String(I.node.key),
      isDir: !I.node.isLeaf,
      x: I.event.clientX,
      y: I.event.clientY
    });
  }, _e = xe(() => H(null), []), Ce = xe(
    (I) => {
      if (!s || !G || X) return;
      const { path: M, isDir: se } = G;
      switch (_e(), I) {
        case "open":
          c(M), u(M), j(!1);
          break;
        case "rename": {
          const ge = M.includes("/") ? M.split("/").pop() : M;
          O({ path: M, isDir: se }), N(ge), setTimeout(() => C.setFieldsValue({ name: ge }), 0);
          break;
        }
        case "delete":
          t.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: se ? i("settings.skills.editor.deleteConfirmContentDir", { path: M, defaultValue: `Delete ${M}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: M, defaultValue: `Delete ${M}?` }),
            onOk: () => v.system.deleteSkillPath({ id: s, path: M }).then(() => {
              l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === M && (c(null), R("")), d === M && (u(null), j(!1)), U();
            }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          u(M), j(se), q(!0);
          break;
        case "newDir":
          u(M), j(se), J(!0);
          break;
      }
    },
    [s, G, _e, U, r, d, C, i, X]
  ), F = () => {
    if (!s || !_ || X) return;
    const I = (C.getFieldValue("name") ?? L).trim();
    if (!I) {
      l.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!_.isDir && !/\.(md|txt)$/i.test(I)) {
      l.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const M = ot(_.path), se = M ? `${M}/${I}` : I;
    if (se === _.path) {
      O(null);
      return;
    }
    v.system.moveSkillPath({ id: s }, { from_path: _.path, to_path: se }).then(() => {
      l.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), r === _.path && c(se), d === _.path && u(se), O(null), U();
    }).catch(() => l.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, ie = (I) => {
    if (!s || X) return;
    const M = String(I.dragNode.key), se = String(I.dragNode.title);
    let ge;
    if (I.dropToGap) {
      const Ze = ot(String(I.node.key));
      ge = Ze ? `${Ze}/${se}` : se;
    } else
      ge = `${I.node.key}/${se}`;
    ge !== M && v.system.moveSkillPath({ id: s }, { from_path: M, to_path: ge }).then(() => {
      l.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), r === M && c(ge), d === M && u(ge), U();
    }).catch(() => l.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, je = () => {
    const I = Y.trim();
    if (!I || !s || X) return;
    const M = Ve ? `${Ve}/${I}` : I;
    if (!/\.(md|txt)$/i.test(I)) {
      l.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    v.system.putSkillFile({ id: s, path: M }, "").then(() => {
      l.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), q(!1), K(""), U(), c(M), R("");
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, b = () => {
    var se;
    const I = (se = te.getFieldValue("name")) == null ? void 0 : se.trim();
    if (!I || !s || X) return;
    const M = Ve ? `${Ve}/${I}` : I;
    v.system.createSkillDir({ id: s }, { path: M }).then(() => {
      l.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), J(!1), te.resetFields(), U();
    }).catch(() => l.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, $ = () => {
    const I = d || r;
    !s || !I || X || t.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: I, defaultValue: `Delete ${I}?` }),
      onOk: () => v.system.deleteSkillPath({ id: s, path: I }).then(() => {
        l.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === I && (c(null), R("")), d === I && (u(null), j(!1)), U();
      }).catch(() => l.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return s ? /* @__PURE__ */ e.jsxs(
    ae,
    {
      title: (x == null ? void 0 : x.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => n("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        X ? /* @__PURE__ */ e.jsx(
          Xe,
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
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Re, {}), disabled: X, onClick: () => q(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Rt, {}), disabled: X, onClick: () => J(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            T ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              ss,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !X,
                expandedKeys: k,
                onExpand: (I) => P(I),
                selectedKeys: d ? [d] : [],
                onSelect: Le,
                onRightClick: X ? void 0 : Te,
                onDrop: ie,
                className: a.fileTree,
                treeData: pe
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            r && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(W, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: r }),
                /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(qe, {}), disabled: X || !w, onClick: ze, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(E, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: X, onClick: $, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(ye, { spinning: Ee, wrapperClassName: Us(a.editorSpin, "ez-editor-spin"), children: jl(r) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  Vt,
                  {
                    value: g,
                    readOnly: X,
                    onChange: (I) => {
                      R(I.target.value), z(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Ge, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(xl, { content: qt(g) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                Vt,
                {
                  value: g,
                  readOnly: X,
                  onChange: (I) => {
                    R(I.target.value), z(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              ) })
            ] }),
            !r && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        G && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: _e,
              onContextMenu: (I) => I.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: G.x, top: G.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            ls,
            {
              selectable: !1,
              items: [
                ...G.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Pt, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Oe, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ie, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(ys, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(js, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: I }) => Ce(I)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: S, onOk: je, onCancel: () => {
          q(!1), K("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: Y, onChange: (I) => K(I.target.value) }) }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: f, onOk: () => te.validateFields().then(b), onCancel: () => J(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(o, { form: te, layout: "vertical", children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!_,
            onOk: F,
            onCancel: () => O(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(o, { form: C, layout: "vertical", onValuesChange: (I, M) => N(M.name ?? ""), children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: _ != null && _.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: _ != null && _.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => F()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bl
}, Symbol.toStringTag, { value: "Module" })), Vl = Qe(() => import("./markdown-viewer.js")), kl = () => {
  const { message: l } = me.useApp(), { id: t } = at(), a = Se(), { t: s } = Z("system"), { data: n, loading: i } = A(
    () => t ? v.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: r, loading: c, mutate: d } = A(
    () => t ? v.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => l.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => d()
    }
  ), u = be(() => r == null ? void 0 : r.map((j) => ({
    key: j.file_name,
    label: j.file_name,
    children: /* @__PURE__ */ e.jsx(Ge, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(Vl, { content: qt(j.content) }) })
  })), [r]);
  if (!t) return null;
  const p = i || c;
  return /* @__PURE__ */ e.jsx(ye, { spinning: p, children: /* @__PURE__ */ e.jsx(
    ae,
    {
      title: (n == null ? void 0 : n.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => a("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: u
    }
  ) });
}, da = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kl
}, Symbol.toStringTag, { value: "Module" })), { Text: he, Title: vl } = mt, ct = ["agent", "llm", "tool"], kt = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(ws, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(_s, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Ss, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(dt, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Ye, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(vs, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Ye, {}) }
}, vt = {
  agent: "#1677ff",
  llm: "#52c41a",
  tool: "#fa8c16"
}, Sl = {
  llm_request: "#1677ff",
  llm_response: "#52c41a",
  tool_call: "#fa8c16",
  tool_result: "#13c2c2",
  token_usage: "#722ed1",
  error: "#ff4d4f",
  summary: "#2f54eb"
}, Ht = gt(({ css: l }) => ({
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
})), _l = gt(({ token: l, css: t }) => ({
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
function Kt(l) {
  const { parsed: t, isJSON: a } = He(l);
  return a && typeof t == "object" && t !== null ? { text: l, value: t } : { text: l };
}
function St(l) {
  if (typeof l == "string") return { text: l };
  const t = JSON.stringify(l, null, 2);
  return typeof l == "object" && l !== null ? { text: t, value: l } : { text: t };
}
function wl(l) {
  const t = l.map((s) => {
    const { parsed: n, isJSON: i } = He(s.content);
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
      const { raw_request: r, raw_response: c, ...d } = i;
      s.display = { text: JSON.stringify(d, null, 2), value: d }, r !== void 0 && a && (a.rawRequest = St(r)), c !== void 0 && (s.rawResponse = St(c));
    }
    a = null;
  }
  return t;
}
const Ke = ({ children: l, fallback: t }) => {
  const [a, s] = y(!1);
  return Fe(() => {
    let n = 0;
    const i = window.requestAnimationFrame(() => {
      n = window.requestAnimationFrame(() => s(!0));
    });
    return () => {
      window.cancelAnimationFrame(i), window.cancelAnimationFrame(n);
    };
  }, []), a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: l }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t ?? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "16px 0" }, children: /* @__PURE__ */ e.jsx(ye, { size: "small" }) }) });
}, ke = ({
  payload: l,
  maxHeight: t
}) => {
  const [a, s] = y("raw"), n = /* @__PURE__ */ e.jsx(
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
      lt,
      {
        size: "small",
        value: a,
        onChange: (i) => s(i),
        options: [
          { value: "raw", icon: /* @__PURE__ */ e.jsx(Nt, {}), title: "Raw" },
          { value: "json", icon: /* @__PURE__ */ e.jsx(Dt, {}), title: "JSON" }
        ]
      }
    ) }),
    a === "json" ? /* @__PURE__ */ e.jsx(Ke, { children: /* @__PURE__ */ e.jsx(
      et,
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
}, rt = "#ff4d4f";
function Gt(l, t) {
  if (!t || !l) return !1;
  if (typeof l.ok == "boolean") return !l.ok;
  const a = (l.result || "").trim();
  return a ? !!(a === "tool call failed" || /^unknown tool:/i.test(a) || /^tool .+ failed:/i.test(a)) : !1;
}
const Cl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  if (!l.isJSON)
    return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
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
}, Tl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = be(
    () => s != null && s.arguments ? Kt(s.arguments) : null,
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
}, Fl = ({
  entry: l,
  t,
  maxHeight: a
}) => {
  const s = l.isJSON ? l.parsed : null, n = be(
    () => s != null && s.result ? Kt(s.result) : null,
    [s]
  );
  if (!s)
    return /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
  const i = Gt(s, !0);
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
}, tt = { verticalAlign: "-2px" }, Il = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = y("request"), { styles: i } = Ht({ isRaw: s === "raw" });
  return l.rawRequest ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      lt,
      {
        size: "small",
        value: s,
        onChange: (r) => n(r),
        options: [
          {
            value: "request",
            icon: /* @__PURE__ */ e.jsx(Tt, { style: tt }),
            title: t("trace.request", { defaultValue: "Request" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx(Ft, { style: tt }),
            title: t("trace.rawRequest", { defaultValue: "Raw Request" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Ke, { children: /* @__PURE__ */ e.jsx(ke, { payload: l.rawRequest, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, Al = ({ entry: l, t, maxHeight: a }) => {
  const [s, n] = y("response"), { styles: i } = Ht({ isRaw: s === "raw" });
  return l.rawResponse ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      lt,
      {
        size: "small",
        value: s,
        onChange: (r) => n(r),
        options: [
          {
            value: "response",
            icon: /* @__PURE__ */ e.jsx(Tt, { style: tt }),
            title: t("trace.response", { defaultValue: "Response" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx(Ft, { style: tt }),
            title: t("trace.rawResponse", { defaultValue: "Raw Response" })
          }
        ]
      }
    ) }),
    s === "raw" ? /* @__PURE__ */ e.jsx(Ke, { children: /* @__PURE__ */ e.jsx(ke, { payload: l.rawResponse, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(ke, { payload: l.display, maxHeight: a });
}, _t = ({ entry: l, t, maxHeight: a }) => {
  const { event: s } = l;
  switch (s.event_type) {
    case "llm_request":
      return /* @__PURE__ */ e.jsx(Il, { entry: l, t, maxHeight: a });
    case "llm_response":
      return /* @__PURE__ */ e.jsx(Al, { entry: l, t, maxHeight: a });
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Cl, { entry: l, t, maxHeight: a });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(Tl, { entry: l, t, maxHeight: a });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Fl, { entry: l, t, maxHeight: a });
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
function wt(l) {
  return ct.indexOf(l);
}
function Ct(l, t) {
  return l > 0 ? ` (${t("trace.durationMs", {
    ms: l,
    defaultValue: `${l}ms`
  })})` : "";
}
function El(l, t) {
  const a = /* @__PURE__ */ new Map();
  for (const n of l) {
    if (n.event.event_type !== "tool_call" || !n.isJSON) continue;
    const i = n.parsed;
    i.tool_call_id && i.tool && a.set(i.tool_call_id, i.tool);
  }
  const s = t("trace.failed", { defaultValue: "Failed" });
  return l.map((n, i) => {
    const { event: r } = n, c = t(`trace.eventTypes.${r.event_type}`, {
      defaultValue: r.event_type
    }), d = Sl[r.event_type] || "#8c8c8c";
    switch (r.event_type) {
      case "llm_request":
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: c,
          kind: "call",
          color: d
        };
      case "llm_response":
        return {
          id: r.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: `${c}${Ct(r.duration_ms, t)}`,
          kind: "return",
          color: d
        };
      case "tool_call": {
        const u = n.isJSON ? n.parsed : null, p = (u == null ? void 0 : u.tool) || c;
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "tool",
          label: p,
          kind: "call",
          color: d
        };
      }
      case "tool_result": {
        const u = n.isJSON ? n.parsed : null, p = Gt(u, n.isJSON), j = (u == null ? void 0 : u.tool_call_id) && a.get(u.tool_call_id) || "", g = j ? `${c}: ${j}` : c;
        return {
          id: r.id,
          entry: n,
          from: "tool",
          to: "agent",
          label: p ? `${g} · ${s}` : g,
          kind: "return",
          color: p ? rt : d,
          failed: p
        };
      }
      case "summary":
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: c,
          kind: "call",
          color: d
        };
      case "token_usage": {
        const u = n.isJSON ? n.parsed : null, p = (u == null ? void 0 : u.total_tokens) != null ? ` · ${u.total_tokens}` : "";
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: `${c}${p}`,
          kind: "note",
          color: d
        };
      }
      case "error": {
        const u = i > 0 ? l[i - 1].event : void 0, p = (u == null ? void 0 : u.event_type) === "llm_request", j = `${c}${Ct(r.duration_ms, t)} · ${s}`;
        return p ? {
          id: r.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: j,
          kind: "return",
          color: rt,
          failed: !0
        } : {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: j,
          kind: "note",
          color: rt,
          failed: !0
        };
      }
      default:
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: c,
          kind: "note",
          color: d
        };
    }
  });
}
const zl = ({ from: l, to: t, label: a, color: s, kind: n, failed: i, styles: r, cx: c }) => {
  const d = wt(l), u = wt(t), p = (Math.min(d, u) + 0.5) * (100 / 3), j = (Math.max(d, u) + 0.5) * (100 / 3), g = j - p, R = u > d, w = n === "return";
  return /* @__PURE__ */ e.jsxs("div", { className: r.arrowTrack, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowLine,
        style: {
          left: `${p}%`,
          width: `${g}%`,
          borderTopColor: s,
          borderTopStyle: w ? "dashed" : "solid"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowHead,
        style: R ? {
          left: `calc(${j}% - 2px)`,
          borderLeft: `8px solid ${s}`
        } : {
          left: `calc(${p}% - 6px)`,
          borderRight: `8px solid ${s}`
        }
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: c(r.arrowLabel, i && r.arrowLabelFailed),
        style: { color: s, borderColor: s },
        title: a,
        children: [
          i && /* @__PURE__ */ e.jsx(Mt, { className: r.failIcon }),
          /* @__PURE__ */ e.jsx("span", { children: a })
        ]
      }
    )
  ] });
}, Ll = ({ entries: l, t, selectedId: a, onSelect: s }) => {
  const { styles: n, cx: i } = _l(), r = be(
    () => El(l, t),
    [l, t]
  ), c = (d) => t(`trace.actors.${d}`, {
    defaultValue: d === "agent" ? "Agent" : d === "llm" ? "LLM" : "Tool"
  });
  return r.length === 0 ? /* @__PURE__ */ e.jsx(
    De,
    {
      description: t("trace.noEvents", {
        defaultValue: "No trace events found for this trace ID"
      })
    }
  ) : /* @__PURE__ */ e.jsx("div", { className: n.sequenceWrap, children: /* @__PURE__ */ e.jsxs("div", { className: n.sequenceInner, children: [
    /* @__PURE__ */ e.jsx("div", { className: n.actorHeader, children: ct.map((d) => /* @__PURE__ */ e.jsx(
      "div",
      {
        className: n.actorBox,
        style: { borderColor: vt[d], color: vt[d] },
        children: c(d)
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: n.messageList, children: [
      /* @__PURE__ */ e.jsx("div", { className: n.lifelineBg, children: ct.map((d) => /* @__PURE__ */ e.jsx("div", { className: n.lifeline }, d)) }),
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
          onKeyDown: (u) => {
            (u.key === "Enter" || u.key === " ") && (u.preventDefault(), s(d.entry));
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
                  d.failed && /* @__PURE__ */ e.jsx(Mt, { className: n.failIcon }),
                  /* @__PURE__ */ e.jsx("span", { children: d.label })
                ]
              }
            ) : /* @__PURE__ */ e.jsx(
              zl,
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
}, Ol = () => {
  const { message: l, modal: t } = me.useApp(), { t: a } = Z("ai"), s = Se(), [n, i] = Bt(), [r, c] = y(""), [d, u] = y(""), [p, j] = y("sequence"), [g, R] = y(
    null
  ), {
    data: w,
    loading: z,
    refresh: k
  } = A(() => v.ai.getAiTraceStatus(), {
    onError: () => {
      l.error(
        a("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), P = (w == null ? void 0 : w.enabled) ?? !1, { loading: S, run: q } = A(
    (x) => v.ai.toggleAiTrace({ enabled: x }),
    {
      manual: !0,
      onSuccess: (x, [m]) => {
        l.success(
          m ? a("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : a("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), k(), m || u("");
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
    data: f,
    loading: J,
    run: Y
  } = A(
    (x) => v.ai.getAiTraceEvents({ trace_id: x }),
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
    (x) => {
      u(x), R(null), Y(x);
    },
    [Y]
  ), te = rs(!1);
  Fe(() => {
    var T, U;
    if (te.current) return;
    te.current = !0;
    const x = (T = n.get("trace_id")) == null ? void 0 : T.trim();
    x && (c(x), K(x));
    const m = (U = n.get("view")) == null ? void 0 : U.trim();
    m && j(m);
  }, [n, K, j]);
  const G = xe(() => {
    const x = r.trim();
    x && (i(
      (m) => {
        const T = new URLSearchParams(m);
        return T.set("trace_id", x), T;
      },
      { replace: !0 }
    ), K(x));
  }, [r, K, i]), H = xe(
    (x) => {
      const m = x ? a("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : a("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      t.confirm({
        title: x ? a("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : a("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: m,
        onOk: () => q(x)
      });
    },
    [a, q, t]
  ), _ = xe(async () => {
    if (d)
      try {
        const x = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!x.ok) throw new Error("download failed");
        const m = await x.blob(), T = window.URL.createObjectURL(m), U = document.createElement("a");
        U.href = T, U.download = `ai-trace-${d}.json`, document.body.appendChild(U), U.click(), window.URL.revokeObjectURL(T), document.body.removeChild(U);
      } catch {
        l.error(
          a("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, a]), O = be(() => f ?? [], [f]), L = be(() => wl(O), [O]);
  Fe(() => {
    R(null);
  }, [d, p]);
  const N = be(
    () => L.map((x) => {
      const { event: m } = x, T = kt[m.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Ye, {})
      }, U = a(`trace.eventTypes.${m.event_type}`, {
        defaultValue: m.event_type
      });
      return {
        key: m.id,
        dot: T.icon,
        color: T.color,
        children: /* @__PURE__ */ e.jsx(
          as,
          {
            size: "small",
            defaultActiveKey: [m.id],
            items: [
              {
                key: m.id,
                label: /* @__PURE__ */ e.jsxs(W, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ne, { color: T.color, children: U }),
                  /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    m.step_order
                  ] }),
                  m.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", style: { fontSize: 12 }, children: [
                    a("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    m.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(he, { type: "secondary", style: { fontSize: 12 }, children: new Date(m.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Ke, { children: /* @__PURE__ */ e.jsx(_t, { entry: x, t: a, maxHeight: 400 }) })
              }
            ]
          }
        )
      };
    }),
    [L, a]
  ), C = g ? kt[g.event.event_type] : null;
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
                icon: /* @__PURE__ */ e.jsx(pt, {}),
                onClick: () => s("/system/settings#ai-models"),
                children: a("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(vl, { level: 4, style: { margin: 0 }, children: a("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(W, { children: [
            /* @__PURE__ */ e.jsx(he, { children: P ? a("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : a("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              de,
              {
                checked: P,
                loading: z || S,
                onChange: H
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(W.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          placeholder: a("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: r,
          onChange: (x) => c(x.target.value),
          onPressEnter: G,
          prefix: /* @__PURE__ */ e.jsx(bs, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(E, { type: "primary", onClick: G, loading: J, children: a("trace.search", { defaultValue: "Search" }) }),
      d && O.length > 0 && /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Vs, {}), onClick: _, children: a("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    J ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ye, { size: "large" }) }) }) : d && O.length === 0 ? /* @__PURE__ */ e.jsx(ae, { children: /* @__PURE__ */ e.jsx(
      De,
      {
        description: a("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : O.length > 0 ? /* @__PURE__ */ e.jsx(
      ae,
      {
        title: /* @__PURE__ */ e.jsx(
          lt,
          {
            value: p,
            onChange: (x) => {
              j(x), i(
                (m) => {
                  const T = new URLSearchParams(m);
                  return T.set("view", x), T;
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
                icon: /* @__PURE__ */ e.jsx(ks, {})
              },
              {
                label: a("trace.viewTimeline", {
                  defaultValue: "Timeline"
                }),
                value: "timeline",
                icon: /* @__PURE__ */ e.jsx(Ot, {})
              }
            ]
          }
        ),
        children: p === "sequence" ? /* @__PURE__ */ e.jsx(
          Ll,
          {
            entries: L,
            t: a,
            selectedId: g == null ? void 0 : g.event.id,
            onSelect: R
          }
        ) : /* @__PURE__ */ e.jsx(is, { items: N })
      }
    ) : null,
    /* @__PURE__ */ e.jsx(
      ns,
      {
        title: g ? /* @__PURE__ */ e.jsxs(W, { children: [
          /* @__PURE__ */ e.jsx(ne, { color: (C == null ? void 0 : C.color) || "default", children: a(`trace.eventTypes.${g.event.event_type}`, {
            defaultValue: g.event.event_type
          }) }),
          /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            "#",
            g.event.step_order
          ] }),
          g.event.duration_ms > 0 && /* @__PURE__ */ e.jsxs(he, { type: "secondary", children: [
            a("trace.duration", { defaultValue: "Duration" }),
            ":",
            " ",
            g.event.duration_ms,
            "ms"
          ] })
        ] }) : null,
        open: p === "sequence" && !!g,
        onClose: () => R(null),
        width: 560,
        children: g && /* @__PURE__ */ e.jsx(Ke, { children: /* @__PURE__ */ e.jsx(_t, { entry: g, t: a }) }, g.event.id)
      }
    )
  ] });
}, ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ol
}, Symbol.toStringTag, { value: "Module" })), Rl = Qe(() => import("./json-schema-config-form.js")), { Text: Ne, Title: Pl } = mt, Ml = ({
  content: l,
  maxHeight: t = 400
}) => {
  const { parsed: a, isJSON: s } = He(l);
  return s ? /* @__PURE__ */ e.jsx(
    et,
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
}, Nl = () => {
  var C;
  const { message: l } = me.useApp(), { t } = Z("system"), { t: a } = Z("common"), s = Se(), { id: n } = at(), [i, r] = y(void 0), [c, d] = y("schema"), [u, p] = y({}), [j, g] = y("{}"), [R, w] = y(null), [z, k] = y(null), { loading: P, data: S } = A(
    () => v.system.getToolSet({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: q, data: f } = A(
    () => v.system.getToolSetTools({ id: n }),
    {
      ready: !!n,
      onError: () => {
        l.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), J = f == null ? void 0 : f.find(
    (x) => {
      var m;
      return ((m = x.function) == null ? void 0 : m.name) === i;
    }
  ), { loading: Y, run: K } = A(
    (x, m) => v.system.callTool({ id: n }, { name: x, parameters: m }),
    {
      manual: !0,
      onSuccess: (x) => {
        w((x == null ? void 0 : x.result) ?? "");
      },
      onError: (x) => {
        var T, U;
        const m = ((U = (T = x.response) == null ? void 0 : T.data) == null ? void 0 : U.message) || x.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        l.error(m), w(null);
      }
    }
  ), te = xe((x) => {
    r(x), p({}), g("{}"), w(null), k(null);
  }, []), G = xe(() => {
    if (c === "schema")
      g(JSON.stringify(u, null, 2)), d("code");
    else {
      const { parsed: x, isJSON: m } = He(j);
      m && (p(x), k(null)), d("schema");
    }
  }, [c, u, j]), H = xe((x) => {
    g(x);
    const { parsed: m, isJSON: T } = He(x);
    T ? (p(m), k(null)) : k(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), _ = xe(() => {
    if (!i) {
      l.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let x;
    if (c === "code") {
      if (z) {
        l.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      x = j;
    } else
      x = JSON.stringify(u);
    w(null), K(i, x);
  }, [i, c, u, j, z, K, t]), O = S, L = (O == null ? void 0 : O.status) === "enabled" ? "green" : "red", N = (O == null ? void 0 : O.status) === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(W, { children: [
      /* @__PURE__ */ e.jsx(
        E,
        {
          icon: /* @__PURE__ */ e.jsx(pt, {}),
          onClick: () => s("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(Pl, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(ae, { style: { marginBottom: 16 }, loading: P, children: O && /* @__PURE__ */ e.jsxs(re, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ne, { strong: !0, children: O.name }) }),
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(ne, { color: "blue", children: String(O.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: O.description || "-" }),
      /* @__PURE__ */ e.jsx(re.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ne, { color: L, children: N }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ae, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ne, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        q ? /* @__PURE__ */ e.jsx(ye, { size: "small" }) : /* @__PURE__ */ e.jsx(
          B,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: i,
            onChange: te,
            optionLabelProp: "label",
            children: (f ?? []).map((x) => {
              var X, pe;
              const m = ((X = x.function) == null ? void 0 : X.name) ?? "", T = ((pe = x.function) == null ? void 0 : pe.description) ?? "", U = T ? `${m} - ${T}` : m;
              return /* @__PURE__ */ e.jsx(B.Option, { value: m, label: U, children: /* @__PURE__ */ e.jsx(
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
              ) }, m);
            })
          }
        )
      ] }),
      J && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(Ne, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            st,
            {
              title: c === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  size: "small",
                  icon: c === "schema" ? /* @__PURE__ */ e.jsx(Dt, {}) : /* @__PURE__ */ e.jsx(Nt, {}),
                  onClick: G
                }
              )
            }
          )
        ] }),
        c === "schema" ? (C = J.function) != null && C.parameters ? /* @__PURE__ */ e.jsx(Ge, { fallback: /* @__PURE__ */ e.jsx(Ue, {}), children: /* @__PURE__ */ e.jsx(
          Rl,
          {
            schema: J.function.parameters,
            value: u,
            onChange: p
          }
        ) }) : /* @__PURE__ */ e.jsx(Ne, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            $s,
            {
              value: j,
              height: "200px",
              extensions: [Bs()],
              onChange: H,
              basicSetup: { lineNumbers: !0, foldGutter: !0 }
            }
          ),
          z && /* @__PURE__ */ e.jsx(Ne, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: z })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: R !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        E,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Cs, {}),
          loading: Y,
          disabled: !i,
          onClick: _,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      R !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(Ne, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(Ml, { content: R, maxHeight: 300 })
      ] })
    ] })
  ] });
}, ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nl
}, Symbol.toStringTag, { value: "Module" })), Dl = () => {
  const { t: l } = Z("system"), [t] = Bt(), a = t.get("provider"), s = t.get("code"), n = t.get("state"), [i, r] = y(null), [c, d] = y(null), [u, p] = y(null);
  return A(async () => {
    if (!s || !n || !a)
      throw new Error(l("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const j = await v.system.testOauthCallback({ code: s, state: n, provider: a });
    if (!j.user_info)
      throw new Error(l("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!j.user)
      throw new Error(l("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    r(j.user), d(j.user_info);
  }, {
    onSuccess: () => {
      p({
        status: "success",
        message: l("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (j) => {
      p({
        status: "error",
        message: l("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: j.message
      });
    }
  }), u ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    os,
    {
      status: u.status,
      title: u.message,
      subTitle: u.error,
      extra: /* @__PURE__ */ e.jsxs(W, { style: { display: !c || !i ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ae, { title: l("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(et, { value: c || {} }) }),
        /* @__PURE__ */ e.jsx(ae, { title: l("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(et, { value: i || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Ue, {});
}, ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dl
}, Symbol.toStringTag, { value: "Module" }));
export {
  ua as A,
  oa as O,
  ra as S,
  ca as T,
  da as a,
  ma as b,
  na as i
};
