import { j as e, g as Ut, h as $t } from "./vendor.js";
import { App as ge, Form as o, Spin as ye, Switch as ue, Select as H, Input as V, Alert as nt, Divider as Xe, Space as K, Button as E, InputNumber as ce, Modal as fe, Skeleton as fs, Descriptions as he, Steps as gs, Tag as de, Table as Me, Radio as Je, Tabs as Bt, Popconfirm as Ht, Tooltip as ut, Typography as Ye, Card as ie, Row as Ke, Col as Se, Checkbox as pt, Empty as We, AutoComplete as Tt, Upload as hs, Tree as xs, Menu as ys, Collapse as js, Timeline as bs, Segmented as ct, Drawer as Vs, Statistic as it, Progress as ks, Result as vs } from "antd";
import { useTranslation as G } from "react-i18next";
import { useState as x, useEffect as ze, useMemo as ke, useCallback as Ve, Suspense as bt, lazy as Vt, useRef as _s } from "react";
import { useRequest as A } from "ahooks";
import { SaveOutlined as Ge, ReloadOutlined as Ce, LoadingOutlined as Ss, CheckCircleTwoTone as ws, ClearOutlined as Cs, StarFilled as Ts, CheckCircleOutlined as Ft, StarOutlined as Fs, EditOutlined as qe, CopyOutlined as Jt, DeleteOutlined as Ne, BugOutlined as Wt, TagsOutlined as Is, PlusOutlined as Ue, ThunderboltOutlined as It, ToolOutlined as xt, SettingOutlined as As, FileTextOutlined as ot, EyeOutlined as Kt, UploadOutlined as At, UnorderedListOutlined as Gt, CalendarOutlined as Es, UndoOutlined as yt, ArrowLeftOutlined as kt, FolderOutlined as Qt, FileOutlined as Zt, FileAddOutlined as zs, FolderAddOutlined as Ps, SearchOutlined as Ls, DownloadOutlined as Os, ApartmentOutlined as Rs, WarningOutlined as Ms, DashboardOutlined as Ns, MessageOutlined as Ds, SendOutlined as qs, CloseCircleOutlined as Xt, AlignLeftOutlined as Yt, CodeOutlined as es, PlayCircleOutlined as Us } from "@ant-design/icons";
import { a as k } from "./index.js";
import { g as Et, h as ts, j as et } from "./base.js";
import { i as pe, e as $s, c as $e, g as ss, L as vt, J as Bs } from "./components.js";
import ls from "react-quill-new";
import { b as _t, u as Hs, a as St } from "./contexts.js";
import { useNavigate as Fe, useLocation as Js, useParams as mt, useSearchParams as as } from "react-router-dom";
import { l as Ws, c as Ks, u as Gs, d as Qs, g as Zs, b as Xs, e as Ys, f as el, r as tl } from "./system.js";
import { l as sl, b as ll } from "./authorization.js";
import { createStyles as wt } from "antd-style";
import al from "classnames";
import rt from "@uiw/react-json-view";
const Be = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, il = {
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
}, nl = ({ initialData: s, onRefresh: t }) => {
  const { message: a } = ge.useApp(), { t: l } = G("system"), { t: n } = G("common"), [i] = o.useForm(), [r, p] = x((s == null ? void 0 : s.provider) || "custom"), [d, c] = x((s == null ? void 0 : s.provider) === "custom" || (s == null ? void 0 : s.provider) === "autoDiscover"), [m, b] = x((s == null ? void 0 : s.enabled) || !1), [y, O] = x((s == null ? void 0 : s.auto_create_user) || !1), { loading: I, data: M, refresh: v } = A(k.system.getOauthSettings, {
    manual: !!s,
    onSuccess: (T) => {
      i.setFieldsValue(T), p(T.provider), c(T.provider === "custom" || T.provider === "autoDiscover"), b(T.enabled), O(T.auto_create_user);
    },
    onError: (T) => {
      a.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", T);
    }
  });
  ze(() => {
    s && (i.setFieldsValue(s), p(s.provider), c(s.provider === "custom" || s.provider === "autoDiscover"), b(s.enabled), O(s.auto_create_user));
  }, [s, i]);
  const q = (T) => {
    p(T), c(T === "custom" || T === "autoDiscover");
    const P = il[T];
    P && i.setFieldsValue({
      auth_endpoint: P.endpoints.auth_endpoint,
      token_endpoint: P.endpoints.token_endpoint,
      userinfo_endpoint: P.endpoints.userinfo_endpoint,
      scope: P.scope,
      // Set field mappings
      email_field: P.email_field,
      username_field: P.username_field,
      full_name_field: P.full_name_field,
      avatar_field: P.avatar_field,
      role_field: P.role_field,
      // Set display configuration
      icon_url: P.icon_url,
      display_name: P.display_name
    });
  }, w = (T) => {
    b(T);
  }, U = (T) => {
    O(T);
  }, { loading: f, run: W } = A(k.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      a.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), t ? t() : v();
    },
    onError: (T) => {
      a.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", T);
    }
  }), Y = (T) => {
    W(T);
  }, J = () => {
    t ? t() : v();
  }, { loading: le, run: Q } = A(async ({ redirect_uri: T, ...P }) => {
    let $;
    return T ? $ = new URL(T) : $ = new URL(window.location.origin), $.pathname = Et("/system/settings/oauth/test-callback"), $.searchParams.set("provider", r), k.system.testOauthConnection({ redirect_uri: $.toString(), ...P });
  }, {
    manual: !0,
    onSuccess: ({ url: T }) => {
      window.open(T, "_blank");
    },
    onError: (T) => {
      a.error(l("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: T.message })), console.error("Failed to test OAuth connection", T);
    }
  }), se = () => r === "custom";
  return /* @__PURE__ */ e.jsx(ye, { spinning: I, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: i,
      layout: "vertical",
      onFinish: Y,
      initialValues: s || M,
      children: [
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "enabled",
            label: l("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(ue, { onChange: w })
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
                required: m,
                message: l("settings.oauth.provider.required", { defaultValue: "Please select an OAuth provider." })
              }
            ],
            children: /* @__PURE__ */ e.jsxs(H, { onChange: q, disabled: !m, children: [
              /* @__PURE__ */ e.jsx(H.Option, { value: "github", children: l("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "google", children: l("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "dingtalk", children: l("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "wechat", children: l("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "autoDiscover", children: l("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "custom", children: l("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
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
              V,
              {
                disabled: !m,
                placeholder: r !== "custom" ? l(`settings.oauth.provider.options.${r}`, { defaultValue: r }) : ""
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
                pattern: Be,
                message: l("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m, placeholder: "https://example.com/icon.png" })
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
                required: m,
                message: l("settings.oauth.clientId.required", { defaultValue: "Client ID is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
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
                required: m,
                message: l("settings.oauth.clientSecret.required", { defaultValue: "Client Secret is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !m, autoComplete: "new-password", visibilityToggle: !1, placeholder: l("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        se() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auth_endpoint",
            label: l("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: l("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: m && r === "custom",
                message: l("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: Be,
                message: l("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "wellknown_endpoint",
            hidden: r !== "autoDiscover",
            label: l("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: l("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: Be,
                message: l("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: m && r === "autoDiscover",
                message: l("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
          }
        ),
        se() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "token_endpoint",
            label: l("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: l("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: m && r === "custom",
                message: l("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: Be,
                message: l("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
          }
        ),
        se() && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "userinfo_endpoint",
            label: l("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: l("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: m && r === "custom",
                message: l("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: Be,
                message: l("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
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
                required: m,
                message: l("settings.oauth.scope.required", { defaultValue: "Scope is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "redirect_uri",
            label: l("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: l("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(T) => T.getFieldValue("redirect_uri") !== "" ? {
              pattern: Be,
              message: l("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m, placeholder: `http://${window.location.host}${Et(`/login?provider=settings.${r}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "auto_create_user",
            label: l("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: l("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(ue, { onChange: U, disabled: !m })
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
                required: m && y,
                message: l("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !m || !y })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_mapping_mode",
            label: l("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: l("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "new_user_only",
            children: /* @__PURE__ */ e.jsxs(H, { disabled: !m, children: [
              /* @__PURE__ */ e.jsx(H.Option, { value: "disabled", children: l("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "new_user_only", children: l("settings.oauth.roleMappingMode.options.new_user_only.label", { defaultValue: "New User Only" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "temporary", children: l("settings.oauth.roleMappingMode.options.temporary.label", { defaultValue: "Temporary" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "enforce", children: l("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          nt,
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
            children: /* @__PURE__ */ e.jsx(ue, { disabled: !m })
          }
        ),
        /* @__PURE__ */ e.jsx(Xe, { children: l("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          nt,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: l("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: d ? "" : l("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "email_field",
            label: l("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: l("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "email", disabled: !m || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "username_field",
            label: l("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: l("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "login", autoComplete: "off", disabled: !m || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "full_name_field",
            label: l("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: l("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "name", disabled: !m || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "avatar_field",
            label: l("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: l("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "avatar_url", disabled: !m || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "role_field",
            label: l("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: l("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "role", disabled: !m || !d })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              children: n("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              loading: le,
              onClick: async () => {
                const T = i.getFieldsValue();
                Q(T);
              },
              children: l("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: J,
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              children: n("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ol = () => {
  const { message: s } = ge.useApp(), { t } = G("system"), { t: a } = G("common"), [l] = o.useForm(), { loading: n, data: i, refresh: r } = A(k.system.getSecuritySettings, {
    onSuccess: (m) => {
      l.setFieldsValue(m);
    },
    onError: (m) => {
      s.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", m);
    }
  }), { loading: p, run: d } = A(k.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      s.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), r();
    },
    onError: (m) => {
      s.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", m);
    }
  }), c = (m) => {
    d(m);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: n, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: l,
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
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_complexity",
            label: t("settings.security.passwordComplexity.label", { defaultValue: "Password Complexity" }),
            tooltip: t("settings.security.passwordComplexity.tooltip", { defaultValue: "Define the complexity requirements for user passwords." }),
            children: /* @__PURE__ */ e.jsxs(H, { children: [
              /* @__PURE__ */ e.jsx(H.Option, { value: "low", children: t("settings.security.passwordComplexity.options.low", { defaultValue: "Low" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "medium", children: t("settings.security.passwordComplexity.options.medium", { defaultValue: "Medium" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "high", children: t("settings.security.passwordComplexity.options.high", { defaultValue: "High" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "very_high", children: t("settings.security.passwordComplexity.options.veryHigh", { defaultValue: "Very High" }) })
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
            children: /* @__PURE__ */ e.jsx(ce, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "password_expiry_notify_days",
            label: t("settings.security.passwordExpiryNotify.label", { defaultValue: "Password Expiry Notification (Days Before Expiry)" }),
            tooltip: t("settings.security.passwordExpiryNotify.tooltip", { defaultValue: "Notify users by email this many days before password expiry. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (m, b) => m.login_failure_lock !== b.login_failure_lock,
            children: ({ getFieldValue: m }) => m("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
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
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (m, b) => m.login_failure_lock !== b.login_failure_lock,
            children: ({ getFieldValue: m }) => m("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              o.Item,
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
          o.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            noStyle: !0,
            shouldUpdate: (m, b) => m.history_password_check !== b.history_password_check,
            children: ({ getFieldValue: m }) => m("history_password_check") ? /* @__PURE__ */ e.jsx(
              o.Item,
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
          o.Item,
          {
            name: "user_inactive_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ce, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              children: a("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => r(),
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              children: a("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, rl = ({ fetchItems: s, importItems: t, columns: a, ...l }) => {
  const { message: n } = ge.useApp(), { t: i } = G("system"), [r, p] = x([]), [d, c] = x([]), { run: m, loading: b } = A(s, {
    onError: (I) => {
      n.error(i("settings.ldap.importError", { error: `${I.message}` }));
    },
    onSuccess: (I) => {
      p(I);
    },
    manual: !0
  }), { run: y, loading: O } = A(async () => {
    for (const I of d.filter((M) => {
      const v = r.find((q) => q.ldap_dn === M);
      return !(!v || v.status === "imported");
    })) {
      const M = await t([I]);
      p((v) => [...v].map((w) => {
        for (const U of M)
          if (w.ldap_dn === U.ldap_dn)
            return { ...U, status: "imported" };
        return w;
      }));
    }
  }, {
    manual: !0
  });
  return ze(() => {
    l.visible && (p([]), m(), c([]));
  }, [l.visible]), /* @__PURE__ */ e.jsx(
    fe,
    {
      title: i("settings.ldap.importTitle"),
      ...l,
      onOk: () => {
        y();
      },
      width: 900,
      confirmLoading: O,
      loading: b,
      children: /* @__PURE__ */ e.jsx(
        Me,
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
          columns: a.map(({ render: I, ...M }) => I ? {
            ...M,
            render: (v, q, w) => {
              const U = d.includes(q.ldap_dn) && O && q.status !== "imported";
              return I(v, q, w, U);
            }
          } : M),
          dataSource: r,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, dl = () => {
  var q, w, U;
  const { message: s } = ge.useApp(), { t } = G("system"), [a] = o.useForm(), [l, n] = x(!1), [i, r] = x(null), [p, d] = x(!1), [c, m] = x(!1), [b] = o.useForm(), [y, O] = x(!1);
  A(k.system.getLdapSettings, {
    onSuccess: (f) => {
      a.setFieldsValue(f), O(f.enabled);
    },
    onError: (f) => {
      s.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${f.message}` }));
    }
  }), ze(() => {
    r(null);
  }, [p]);
  const I = async (f) => {
    n(!0);
    try {
      await k.system.updateLdapSettings(f), s.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      s.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      n(!1);
    }
  }, { run: M, loading: v } = A(async (f) => {
    const W = await a.validateFields();
    return await k.system.testLdapConnection({
      ...f,
      ...W
    });
  }, {
    onSuccess: (f) => {
      r(f);
    },
    onError: (f) => {
      s.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${f.message}` }));
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
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (f) => O(f) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: y, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: y, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: y, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(V.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: y, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: y, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: y, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: y, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: y, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(V, { type: "number", defaultValue: 15, disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(Xe, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(ue, { disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !y })
            }
          ),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: l, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !y,
                style: { marginLeft: 8 },
                onClick: () => d(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(pe, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              E,
              {
                disabled: !y,
                style: { marginLeft: 8 },
                onClick: () => {
                  m(!0);
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
        open: p,
        onCancel: () => d(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            o,
            {
              form: b,
              layout: "vertical",
              onFinish: M,
              children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V, { disabled: !y })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !y })
                  }
                ),
                /* @__PURE__ */ e.jsxs(o.Item, { children: [
                  /* @__PURE__ */ e.jsx(pe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(E, { disabled: !y, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
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
          /* @__PURE__ */ e.jsx(ye, { spinning: v, children: /* @__PURE__ */ e.jsx(fs, { active: v, loading: v, children: i && (i.user ? /* @__PURE__ */ e.jsxs(he, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(he.Item, { label: "Username", span: 3, children: i.user.username }),
            /* @__PURE__ */ e.jsx(he.Item, { label: "Email", span: 3, children: i.user.email }),
            /* @__PURE__ */ e.jsx(he.Item, { label: "FullName", span: 3, children: i.user.full_name }),
            /* @__PURE__ */ e.jsx(he.Item, { label: "CreatedAt", span: 3, children: i.user.created_at }),
            /* @__PURE__ */ e.jsx(he.Item, { label: "UpdatedAt", span: 3, children: i.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            gs,
            {
              direction: "vertical",
              current: (q = i.message) == null ? void 0 : q.findIndex((f) => !f.success),
              status: (w = i.message) != null && w.find((f) => !f.success) ? "error" : "finish",
              items: (U = i.message) == null ? void 0 : U.map((f) => ({
                status: f.success ? "finish" : "error",
                title: f.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      rl,
      {
        visible: c,
        onCancel: () => m(!1),
        fetchItems: () => k.system.importLdapUsers({}),
        importItems: (f) => k.system.importLdapUsers({ user_dn: f }),
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
          render: (f, W, Y, J) => J ? /* @__PURE__ */ e.jsx(ye, { indicator: /* @__PURE__ */ e.jsx(Ss, { spin: !0 }) }) : f ? /* @__PURE__ */ e.jsx(ws, { twoToneColor: "#52c41a" }) : W.id ? /* @__PURE__ */ e.jsx(de, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(de, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, ul = () => {
  const { message: s } = ge.useApp(), { t } = G("system"), { t: a } = G("common"), [l] = o.useForm(), [n, i] = x(null), [r, p] = x(!1), [d] = o.useForm(), [c, m] = x(!1), { data: b } = A(k.system.getSmtpSettingFields), { loading: y } = A(k.system.getSmtpSettings, {
    onSuccess: (w) => {
      l.setFieldsValue(w), m(w.enabled);
    },
    onError: (w) => {
      s.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${w.message}` }));
    }
  });
  ze(() => {
    i(null);
  }, [r]);
  const { run: O, loading: I } = A(({ port: w, ...U }) => k.system.updateSmtpSettings({ ...U, port: Number(w) }), {
    manual: !0,
    onSuccess: () => {
      s.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (w) => {
      s.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${w.message}` }));
    }
  }), { run: M, loading: v } = A(async (w) => {
    const { port: U, ...f } = await l.validateFields();
    return await k.system.testSmtpConnection({
      ...w,
      ...f,
      port: Number(U)
    });
  }, {
    onSuccess: (w) => {
      i(w);
    },
    onError: (w) => {
      s.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${w.message}` }));
    },
    manual: !0
  }), q = (w) => {
    switch (w.value_type) {
      case "number":
        return /* @__PURE__ */ e.jsx(ce, { style: { width: "100%" }, disabled: !c, min: w.min, max: w.max, step: w.step });
      case "percentage":
        return /* @__PURE__ */ e.jsx(ce, { style: { width: "100%" }, disabled: !c, min: 0, max: 100, step: w.step || 0.01, addonAfter: "%" });
      case "string_list":
        return /* @__PURE__ */ e.jsx(H, { mode: "tags", tokenSeparators: [","], disabled: !c });
      case "enum":
        return /* @__PURE__ */ e.jsx(H, { disabled: !c, options: w.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(ls, { theme: "snow", readOnly: !c });
      case "string":
      default:
        return /* @__PURE__ */ e.jsx(V, { disabled: !c });
    }
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ye, { spinning: y, children: /* @__PURE__ */ e.jsxs(
      o,
      {
        form: l,
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
              children: /* @__PURE__ */ e.jsx(ue, { onChange: (w) => m(w) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: c, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: c, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { type: "number", disabled: !c, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: c, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "user@example.com", autoComplete: "off" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !c, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: c, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Je.Group, { disabled: !c, children: [
                /* @__PURE__ */ e.jsx(Je.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Je.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Je.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
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
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !c, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t("settings.smtp.adminEmails", { defaultValue: "Admin Emails" }),
              name: "admin_emails",
              tooltip: t("settings.smtp.adminEmailsTooltip", { defaultValue: "Email addresses that receive admin notifications." }),
              children: /* @__PURE__ */ e.jsx(
                H,
                {
                  mode: "tags",
                  tokenSeparators: [","],
                  disabled: !c,
                  placeholder: t("settings.smtp.adminEmailsPlaceholder", { defaultValue: "Enter email addresses" })
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(Xe, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          (b || []).map((w) => /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: t(w.label_key || `settings.smtp.${w.key}`, { defaultValue: w.key }),
              name: w.key,
              tooltip: w.tooltip_key ? t(w.tooltip_key, { defaultValue: "" }) : void 0,
              children: q(w)
            },
            w.key
          )),
          /* @__PURE__ */ e.jsxs(o.Item, { children: [
            /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: I, style: { marginRight: 8 }, children: a("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              E,
              {
                onClick: () => p(!0),
                disabled: !c || v,
                loading: v,
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
        onCancel: () => p(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => p(!1), children: a("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(E, { type: "primary", loading: v, onClick: () => d.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: d,
            layout: "vertical",
            onFinish: (w) => M(w),
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
}, cl = () => {
  const { message: s } = ge.useApp(), { t, i18n: a } = G("system"), { t: l } = G("common"), [n] = o.useForm(), { fetchSiteConfig: i, currentOrgId: r } = _t(), { user: p } = Hs(), d = o.useWatch("enable_multi_org", n), c = o.useWatch("default_organization_id", n), m = ke(() => {
    var W;
    const f = (W = p == null ? void 0 : p.organizations) == null ? void 0 : W.find((Y) => Y.id === r);
    return f != null && f.name ? `${f.name} (${r})` : r || "";
  }, [p == null ? void 0 : p.organizations, r]), b = ke(() => {
    var W;
    const f = (W = p == null ? void 0 : p.organizations) == null ? void 0 : W.find((Y) => Y.id === c);
    return f != null && f.name ? `${f.name} (${c})` : c || "";
  }, [p == null ? void 0 : p.organizations, c]), { loading: y, data: O, refresh: I } = A(k.system.getSystemBaseSettings, {
    onSuccess: (f) => {
      n.setFieldsValue(f);
    },
    onError: (f) => {
      s.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", f);
    }
  }), { loading: M, run: v } = A(k.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: async () => {
      s.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), I(), await i();
    },
    onError: (f) => {
      s.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", f);
    }
  }), { loading: q, run: w } = A(k.system.clearSiteCache, {
    manual: !0,
    onSuccess: () => {
      s.success(
        t("settings.base.clearSiteCacheSuccess", { defaultValue: "Site cache cleared successfully" })
      );
    },
    onError: (f) => {
      s.error(t("settings.base.clearSiteCacheFailed", { defaultValue: "Failed to clear site cache" })), console.error("Failed to clear site cache", f);
    }
  }), U = (f) => {
    v(f);
  };
  return /* @__PURE__ */ e.jsx(ye, { spinning: y, children: /* @__PURE__ */ e.jsxs(
    o,
    {
      form: n,
      layout: "vertical",
      onFinish: U,
      initialValues: O,
      children: [
        /* @__PURE__ */ e.jsx(o.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Bt, { items: [{
          key: "default",
          label: l("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }, ...$s.map((f) => ({
          key: f.lang,
          label: a.language !== f.lang ? l(`language.${f.lang}`, { defaultValue: f.label, lang: f.label }) : f.label,
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
            children: /* @__PURE__ */ e.jsx(ue, {})
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
            children: /* @__PURE__ */ e.jsx(ue, {})
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
            children: /* @__PURE__ */ e.jsx(V, { value: b, disabled: !0 })
          }
        ),
        d && m && /* @__PURE__ */ e.jsx(
          o.Item,
          {
            label: t("settings.base.currentOrganization", { defaultValue: "Current Organization" }),
            tooltip: t("settings.base.currentOrganizationTooltip", {
              defaultValue: "If you disable multi-organization, this organization will become the default organization."
            }),
            children: /* @__PURE__ */ e.jsx(V, { value: m, disabled: !0 })
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
            children: /* @__PURE__ */ e.jsx(ue, {})
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
            children: /* @__PURE__ */ e.jsx(ue, {})
          }
        ),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              htmlType: "submit",
              loading: M,
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            E,
            {
              onClick: () => I(),
              icon: /* @__PURE__ */ e.jsx(Ce, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          ),
          /* @__PURE__ */ e.jsx(pe, { permission: "system:settings:update", children: /* @__PURE__ */ e.jsx(
            Ht,
            {
              title: t("settings.base.clearSiteCacheConfirm", {
                defaultValue: "Clear all server-side application caches? Active sessions may need to sign in again."
              }),
              okText: l("ok", { defaultValue: "OK" }),
              cancelText: l("cancel", { defaultValue: "Cancel" }),
              onConfirm: () => w(),
              children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Cs, {}), loading: q, children: t("settings.base.clearSiteCache", { defaultValue: "Clear site cache" }) })
            }
          ) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: zt } = V, ml = ({ schema: s, uiSchema: t, name: a, provider: l }) => {
  const { t: n } = G("ai", { keyPrefix: `models.${l}.form` });
  return /* @__PURE__ */ e.jsx(
    ss,
    {
      name: a,
      schema: s,
      uiSchema: t,
      t: n
    }
  );
}, pl = () => {
  var st;
  const { message: s, modal: t } = ge.useApp(), { t: a } = G("ai"), { t: l } = G("common"), n = Fe(), { hasPermission: i } = St(), r = i("ai:models:update"), [p] = o.useForm(), [d, c] = x(!1), [m, b] = x(!1), [y, O] = x(null), [I, M] = x(""), [v, q] = x(""), [w, U] = x(!1), [f, W] = x(!1), [Y, J] = x(!1), [le, Q] = x([]), [se, T] = x({}), [P, $] = x({}), [N, _] = x([]), { loading: j, data: F } = A(
    () => k.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (g) => {
        s.error(a("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", g);
      }
    }
  ), R = ke(() => F == null ? void 0 : F.find((g) => g.provider === v), [F, v]), { loading: Z, data: B, refresh: ne } = A(
    () => k.ai.listAiModels({ current: 1, page_size: 100, search: I }),
    {
      refreshDeps: [I],
      onError: (g) => {
        s.error(a("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", g);
      }
    }
  ), { loading: je, run: Pe } = A(
    ({ config: g, ...L }) => k.ai.createAiModel({ config: g ?? {}, ...L }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("models.createSuccess", { defaultValue: "AI model created successfully" })), c(!1), ne();
      },
      onError: (g) => {
        s.error(a("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", g);
      }
    }
  ), { loading: Le, run: Oe } = A(
    ({ id: g, data: L }) => k.ai.updateAiModel({ id: g }, L),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("models.updateSuccess", { defaultValue: "AI model updated successfully" })), c(!1), ne();
      },
      onError: (g) => {
        s.error(a("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", g);
      }
    }
  ), { runAsync: Ie } = A(
    (g) => k.ai.deleteAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), ne();
      },
      onError: (g) => {
        s.error(a("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", g);
      }
    }
  ), { runAsync: ve } = A(
    (g) => k.ai.testAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (g) => {
        s.error(a("models.testFailedDetail", {
          defaultValue: "AI model connection test failed: {{error}}",
          error: g.message
        })), console.error("Failed to test AI model:", g);
      }
    }
  ), { loading: Ae, runAsync: C } = A(
    (g) => k.ai.testAiModelConfig({
      provider: g.provider,
      config: g.config ?? {}
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (g) => {
        s.error(a("models.testFailedDetail", {
          defaultValue: "AI model connection test failed: {{error}}",
          error: g.message
        })), console.error("Failed to test AI model config:", g);
      }
    }
  ), oe = async () => {
    try {
      const g = await p.validateFields();
      await C(g);
    } catch (g) {
      if (g && typeof g == "object" && "errorFields" in g)
        return;
    }
  }, { runAsync: be } = A(
    (g) => k.ai.setDefaultAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), ne();
      },
      onError: (g) => {
        s.error(a("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", g);
      }
    }
  ), Te = le.some(
    (g) => (se[g.key] ?? "") !== (P[g.key] ?? "")
  ), Re = (g, L) => a(`models.purposes.${g}.label`, { defaultValue: L || g }), z = async () => {
    U(!0), W(!0);
    try {
      const [g, L] = await Promise.all([
        k.ai.listAiModelPurposes(),
        k.ai.listAiModels({ current: 1, page_size: 100, search: "" })
      ]), re = {};
      for (const lt of g)
        re[lt.key] = lt.model_id ?? "";
      Q(g), $(re), T(re), _(L.data ?? []);
    } catch (g) {
      s.error(a("models.purposeFetchFailed", { defaultValue: "Failed to load purpose assignments" })), console.error("Failed to load purpose assignments:", g), U(!1);
    } finally {
      W(!1);
    }
  }, D = () => {
    Y || U(!1);
  }, ae = async () => {
    const g = le.filter(
      (L) => (se[L.key] ?? "") !== (P[L.key] ?? "")
    );
    if (g.length === 0) {
      U(!1);
      return;
    }
    J(!0);
    try {
      for (const L of g)
        await k.ai.setAiModelPurpose({ purpose: L.key }, { model_id: se[L.key] ?? "" });
      s.success(a("models.purposeSaveSuccess", { defaultValue: "Purpose assignments saved" })), U(!1), ne();
    } catch (L) {
      s.error(a("models.purposeSaveFailed", { defaultValue: "Failed to save purpose assignments" })), console.error("Failed to save purpose assignments:", L), ne();
    } finally {
      J(!1);
    }
  }, me = (g) => {
    const L = g.purposes ?? [];
    if (L.length > 0) {
      t.warning({
        title: a("models.deleteBlockedTitle", { defaultValue: "This model cannot be deleted" }),
        content: a("models.deletePurposeConfirm", {
          defaultValue: "This model is used for: {{purposes}}. Unassign those purposes before deleting it.",
          purposes: L.map((re) => Re(re)).join(", ")
        })
      });
      return;
    }
    Ie(g.id);
  }, Ee = () => {
    c(!1);
  }, Qe = () => {
    b(!1), window.setTimeout(() => {
      p.resetFields(), O(null), q("");
    }, 0);
  };
  ze(() => {
    if (!d)
      return;
    const g = window.setTimeout(() => b(!0), 0);
    return () => window.clearTimeout(g);
  }, [d]);
  const Ze = () => {
    O(null), q(""), b(!1), p.resetFields(), c(!0);
  }, h = (g) => {
    O(g), q(g.provider), b(!1);
    const L = g.config || {}, re = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      is_default: g.is_default,
      config: L,
      // Spread config fields to form
      status: g.status,
      system_prompt: g.system_prompt ?? "",
      auto_cache_breakpoint: g.auto_cache_breakpoint ?? !0,
      max_chat_tokens: g.max_chat_tokens ?? 0,
      max_chat_iterations: g.max_chat_iterations ?? 0
    };
    p.setFieldsValue(re), c(!0);
  }, u = async (g) => {
    O(null), q(g.provider), b(!1), p.resetFields();
    try {
      const L = await k.ai.getAiModel({ id: g.id }), re = { ...L.config || {} };
      "api_key" in re && (re.api_key = ""), p.setFieldsValue({
        name: `${L.name} (copy)`,
        description: L.description,
        provider: L.provider,
        config: re,
        is_default: !1,
        status: "enabled",
        system_prompt: L.system_prompt ?? "",
        auto_cache_breakpoint: L.auto_cache_breakpoint ?? !0,
        max_chat_tokens: L.max_chat_tokens ?? 0,
        max_chat_iterations: L.max_chat_iterations ?? 0
      }), c(!0);
    } catch {
      s.error(a("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, S = (g) => {
    q(g), p.setFieldValue("config", void 0);
  }, ee = (g) => {
    const L = g.config ?? {}, re = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      config: L,
      is_default: g.is_default,
      status: g.status,
      system_prompt: g.system_prompt ?? "",
      auto_cache_breakpoint: g.auto_cache_breakpoint ?? !0,
      max_chat_tokens: g.max_chat_tokens ?? 0,
      max_chat_iterations: g.max_chat_iterations ?? 0
    };
    y ? Oe({ id: y.id, data: re }) : Pe(re);
  }, X = [
    {
      title: a("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (g, L) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: g }),
        L.is_default && /* @__PURE__ */ e.jsx(ut, { title: a("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Ts, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: a("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (g) => /* @__PURE__ */ e.jsx(de, { color: "blue", children: g.toUpperCase() })
    },
    {
      title: a("models.purposesColumn", { defaultValue: "Purposes" }),
      dataIndex: "purposes",
      key: "purposes",
      render: (g) => /* @__PURE__ */ e.jsx(K, { size: [4, 4], wrap: !0, children: (g ?? []).map((L) => /* @__PURE__ */ e.jsx(de, { children: Re(L) }, L)) })
    },
    {
      title: a("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (g) => /* @__PURE__ */ e.jsx(de, { color: g === "enabled" ? "green" : "red", children: g === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (g, L) => /* @__PURE__ */ e.jsx($e, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Ft, {}),
          tooltip: a("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => ve(L.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Fs, {}),
          disabled: L.is_default,
          tooltip: a("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => be(L.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(qe, {}),
          tooltip: a("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => h(L)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(Jt, {}),
          tooltip: a("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => u(L)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          tooltip: a("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => me(L),
          danger: !0
        }
      ] }, "actions")
    }
  ], te = N.find((g) => g.is_default && g.status === "enabled"), De = [
    {
      title: a("models.purpose", { defaultValue: "Purpose" }),
      dataIndex: "key",
      width: 140,
      render: (g, L) => Re(g, L.name)
    },
    {
      title: a("models.purposeDescription", { defaultValue: "Description" }),
      dataIndex: "description",
      render: (g, L) => a(`models.purposes.${L.key}.description`, { defaultValue: g })
    },
    {
      title: a("models.purposeModel", { defaultValue: "Model" }),
      key: "model",
      width: 280,
      render: (g, L) => {
        const re = se[L.key] ?? "", lt = N.some((_e) => _e.id === re), Ct = N.filter((_e) => _e.status === "enabled" || _e.id === re).map((_e) => ({
          label: _e.name,
          value: _e.id,
          disabled: _e.status !== "enabled"
        }));
        re && !lt && Ct.push({
          label: L.model_name || re,
          value: re,
          disabled: !0
        });
        const at = N.find((_e) => _e.id === re), ms = !!re && ((at == null ? void 0 : at.status) === "disabled" || !at && L.model_status === "disabled" && re === L.model_id);
        return /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            H,
            {
              allowClear: !0,
              style: { width: "100%" },
              disabled: !r,
              placeholder: te ? a("models.purposePlaceholder", { defaultValue: "Default: {{name}}", name: te.name }) : a("models.purposeNoDefault", { defaultValue: "Use the default model" }),
              value: re || void 0,
              options: Ct,
              onChange: (_e) => {
                T((ps) => ({ ...ps, [L.key]: _e ?? "" }));
              }
            }
          ),
          ms && /* @__PURE__ */ e.jsx(Ye.Text, { type: "warning", children: a("models.purposeDisabledFallback", {
            defaultValue: "This model is disabled. The purpose is using the default model."
          }) })
        ] });
      }
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ke, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsx(
        V.Search,
        {
          placeholder: a("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          onSearch: (g) => M(g),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(Wt, {}),
            onClick: () => n("/system/settings/ai-trace"),
            children: a("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(Is, {}),
            onClick: z,
            children: a("models.assignPurposes", { defaultValue: "Assign purposes" })
          }
        ),
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(Ce, {}),
            onClick: ne,
            loading: Z,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ue, {}),
            onClick: Ze,
            children: a("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: X,
        dataSource: (B == null ? void 0 : B.data) || [],
        loading: Z,
        rowKey: "id",
        pagination: {
          total: (B == null ? void 0 : B.total) || 0,
          current: (B == null ? void 0 : B.current) || 1,
          pageSize: (B == null ? void 0 : B.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (g, L) => l("pagination.total", {
            defaultValue: `${L[0]}-${L[1]} of ${g} items`,
            start: L[0],
            end: L[1],
            total: g
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: y ? a("models.edit", { defaultValue: "Edit AI Model" }) : a("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        loading: !m,
        destroyOnHidden: !0,
        afterClose: Qe,
        onCancel: Ee,
        footer: null,
        width: ((st = R == null ? void 0 : R.ui_schema) == null ? void 0 : st["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: p,
            layout: "vertical",
            onFinish: ee,
            autoComplete: "off",
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { maxHeight: "calc(100vh - 300px)", overflowY: "auto", overflowX: "hidden" }, children: [
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "name",
                    label: a("models.name", { defaultValue: "Name" }),
                    rules: [{ required: !0, message: a("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                    children: /* @__PURE__ */ e.jsx(V, { placeholder: a("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "description",
                    label: a("models.description", { defaultValue: "Description" }),
                    children: /* @__PURE__ */ e.jsx(
                      zt,
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
                      H,
                      {
                        loading: j,
                        placeholder: a("models.providerPlaceholder", { defaultValue: "Select provider" }),
                        onChange: S,
                        value: v,
                        options: F == null ? void 0 : F.map((g) => ({
                          label: g.name,
                          value: g.provider
                        }))
                      }
                    )
                  }
                ),
                R && /* @__PURE__ */ e.jsx(
                  ml,
                  {
                    name: "config",
                    schema: R.config_schema,
                    uiSchema: R.ui_schema,
                    provider: v
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "system_prompt",
                    label: a("models.systemPrompt", { defaultValue: "System Prompt" }),
                    tooltip: a("models.systemPromptHelp", {
                      defaultValue: "Optional system prompt prepended to every conversation for this model."
                    }),
                    children: /* @__PURE__ */ e.jsx(
                      zt,
                      {
                        rows: 4,
                        placeholder: a("models.systemPromptPlaceholder", {
                          defaultValue: "Enter system prompt (optional)"
                        })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsxs(Ke, { gutter: 16, children: [
                  /* @__PURE__ */ e.jsx(Se, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_tokens",
                      label: a("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                      tooltip: a("models.maxChatTokensHelp", {
                        defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) }),
                  /* @__PURE__ */ e.jsx(Se, { span: 12, children: /* @__PURE__ */ e.jsx(
                    o.Item,
                    {
                      name: "max_chat_iterations",
                      label: a("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                      tooltip: a("models.maxChatIterationsHelp", {
                        defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                      }),
                      children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" }, placeholder: "0" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "auto_cache_breakpoint",
                    valuePropName: "checked",
                    initialValue: !0,
                    label: a("models.autoCacheBreakpoint", { defaultValue: "Automatically add cache breakpoint" }),
                    tooltip: a("models.autoCacheBreakpointHelp", {
                      defaultValue: "Insert a prompt-cache breakpoint after this model's system prompt. Ignored when the model does not support it."
                    }),
                    children: /* @__PURE__ */ e.jsx(ue, {})
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  o.Item,
                  {
                    name: "is_default",
                    valuePropName: "checked",
                    label: a("models.setAsDefault", { defaultValue: "Set as default model" }),
                    children: /* @__PURE__ */ e.jsx(ue, {})
                  }
                ),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: a("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: je || Le,
                    children: y ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    htmlType: "button",
                    icon: /* @__PURE__ */ e.jsx(Ft, {}),
                    loading: Ae,
                    onClick: oe,
                    children: a("models.test", { defaultValue: "Test Connection" })
                  }
                ),
                /* @__PURE__ */ e.jsx(E, { onClick: Ee, children: l("cancel", { defaultValue: "Cancel" }) })
              ] }) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsxs(
      fe,
      {
        title: a("models.assignPurposesTitle", { defaultValue: "Assign purposes" }),
        open: w,
        onCancel: D,
        width: 760,
        destroyOnHidden: !0,
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: D, disabled: Y, children: l("cancel", { defaultValue: "Cancel" }) }, "cancel"),
          r ? /* @__PURE__ */ e.jsx(
            E,
            {
              type: "primary",
              loading: Y,
              disabled: !Te || f,
              onClick: ae,
              children: l("ok", { defaultValue: "OK" })
            },
            "ok"
          ) : null
        ],
        children: [
          /* @__PURE__ */ e.jsx(Ye.Paragraph, { type: "secondary", children: a("models.assignPurposesHelp", {
            defaultValue: "Leave a purpose empty to use the default model. Only changed rows are saved."
          }) }),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: De,
              dataSource: le,
              loading: f,
              rowKey: "key",
              pagination: !1
            }
          )
        ]
      }
    )
  ] });
}, { TextArea: fl } = V, gl = ({ schema: s, uiSchema: t, name: a, type: l }) => {
  const { t: n } = G("system", { keyPrefix: `settings.toolsets.${l}.form` });
  return /* @__PURE__ */ e.jsx(
    ss,
    {
      name: a,
      schema: s,
      uiSchema: t,
      t: n
    }
  );
}, hl = () => {
  var h;
  const { message: s } = ge.useApp(), { t } = G("system"), { t: a } = G("common"), l = Fe(), [n] = o.useForm(), [i, r] = x(!1), [p, d] = x(!1), [c, m] = x(null), [b, y] = x(""), [O, I] = x(!1), [M, v] = x(null), [q, w] = x(""), [U, f] = x(!1), [W, Y] = x([]), [J, le] = x(), [Q, se] = x("user"), [T, P] = x(null), { loading: $, data: N, refresh: _ } = A(
    () => k.system.listToolSets({
      current: 1,
      page_size: 100,
      search: b,
      type: J,
      is_preset: Q === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [b, J, Q],
      onError: (u) => {
        s.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", u);
      }
    }
  ), { loading: j, data: F } = A(
    () => k.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (u) => {
        s.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", u);
      }
    }
  ), R = ke(() => F == null ? void 0 : F.find((u) => u.tool_set_type === q), [F, q]), Z = ke(() => (F ?? []).filter(
    (u) => u.allow_manual_create || u.tool_set_type === (c == null ? void 0 : c.type)
  ), [F, c]), { loading: B, run: ne } = A(
    (u) => k.system.createToolSet({
      ...u,
      type: u.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), r(!1), _();
      },
      onError: (u) => {
        s.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", u);
      }
    }
  ), { loading: je, run: Pe } = A(
    ({ id: u, data: S }) => k.system.updateToolSet({ id: u }, {
      ...S,
      type: S.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), r(!1), _();
      },
      onError: (u) => {
        s.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", u);
      }
    }
  ), { run: Le } = A(
    (u) => k.system.deleteToolSet({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), _();
      },
      onError: (u) => {
        s.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", u);
      }
    }
  ), { runAsync: Oe } = A(
    (u) => k.system.testToolSet({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (u) => {
        s.error(t("settings.toolsets.testFailedDetail", {
          defaultValue: "Toolset connection test failed: {{error}}",
          error: u.message
        })), console.error("Failed to test toolset:", u);
      }
    }
  ), { loading: Ie, runAsync: ve } = A(
    (u) => k.system.testToolSetConfig({
      type: u.type,
      config: u.config ?? {}
    }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (u) => {
        s.error(t("settings.toolsets.testFailedDetail", {
          defaultValue: "Toolset connection test failed: {{error}}",
          error: u.message
        })), console.error("Failed to test toolset config:", u);
      }
    }
  ), Ae = async () => {
    try {
      const u = await n.validateFields();
      await ve(u);
    } catch (u) {
      if (u && typeof u == "object" && "errorFields" in u)
        return;
    }
  }, { loading: C, runAsync: oe } = A(
    (u) => k.system.getToolSetTools({ id: u }),
    {
      manual: !0,
      onSuccess: (u) => {
        Y(u || []), f(!0);
      },
      onError: (u) => {
        s.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", u);
      }
    }
  ), be = Ve(
    async (u, S) => {
      P(u.id);
      try {
        await k.system.updateToolSetStatus(
          { id: u.id },
          { status: S ? "enabled" : "disabled" }
        ), s.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), _();
      } catch (ee) {
        s.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", ee);
      } finally {
        P(null);
      }
    },
    [t, _]
  ), Te = () => {
    r(!1);
  }, Re = () => {
    d(!1), window.setTimeout(() => {
      n.resetFields(), m(null), w("");
    }, 0);
  };
  ze(() => {
    if (!i)
      return;
    const u = window.setTimeout(() => d(!0), 0);
    return () => window.clearTimeout(u);
  }, [i]);
  const z = () => {
    m(null), w(""), d(!1), n.resetFields(), r(!0);
  }, D = (u) => {
    m(u), w(u.type), d(!1), n.setFieldsValue({ ...u }), r(!0);
  }, ae = (u) => {
    w(u), n.setFieldValue("config", {});
  }, me = (u) => {
    c ? Pe({ id: c.id, data: u }) : ne(u);
  }, Ee = (u) => {
    Le(u);
  }, Qe = (u) => {
    v(u), I(!0);
  }, Ze = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (u, S) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: u }),
        S.is_preset ? /* @__PURE__ */ e.jsx(de, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (u) => /* @__PURE__ */ e.jsx(de, { color: "blue", children: u.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      key: "status",
      width: 120,
      render: (u, S) => {
        const ee = S.status === "enabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:toolsets:update",
            fallback: /* @__PURE__ */ e.jsx(de, { color: ee ? "green" : "red", children: ee ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              ut,
              {
                title: ee ? t("settings.toolsets.tooltipDisableToolSet", { defaultValue: "Disable this toolset" }) : t("settings.toolsets.tooltipEnableToolSet", { defaultValue: "Enable this toolset" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: ee,
                    loading: T === S.id,
                    onChange: (X) => void be(S, X)
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
      render: (u, S) => /* @__PURE__ */ e.jsx($e, { actions: [
        {
          key: "debug",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.debug", { defaultValue: "Debug Tool" }),
          icon: /* @__PURE__ */ e.jsx(Wt, {}),
          disabled: S.status !== "enabled",
          onClick: async () => l(`/system/settings/toolsets/${S.id}/debug`)
        },
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(It, {}),
          disabled: S.status !== "enabled",
          onClick: async () => Oe(S.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(xt, {}),
          permission: "system:toolsets:view",
          disabled: S.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => oe(S.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(As, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => Qe(S.config),
          disabled: !S.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: S.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(qe, {}),
          onClick: async () => D(S),
          disabled: !!S.is_preset
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          permission: "system:toolsets:delete",
          tooltip: S.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : a("delete", { defaultValue: "Delete" }),
          onClick: async () => Ee(S.id),
          danger: !0,
          disabled: !!S.is_preset,
          confirm: S.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => Ee(S.id),
            okText: a("confirm", { defaultValue: "Confirm" }),
            cancelText: a("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ke, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            onSearch: (u) => y(u),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          H,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: J,
            onChange: (u) => le(u),
            options: F == null ? void 0 : F.map((u) => ({
              label: u.name,
              value: u.tool_set_type
            })),
            style: { minWidth: 200 },
            allowClear: !0,
            showSearch: !0,
            children: [
              /* @__PURE__ */ e.jsx(H.Option, { value: "", children: "All" }),
              F == null ? void 0 : F.map((u) => /* @__PURE__ */ e.jsx(H.Option, { value: u.tool_set_type, children: u.name }, u.tool_set_type))
            ]
          }
        ),
        /* @__PURE__ */ e.jsx(
          Je.Group,
          {
            optionType: "button",
            value: Q,
            onChange: (u) => se(u.target.value),
            options: [
              { value: "user", label: t("settings.toolsets.scopeUser", { defaultValue: "User toolsets" }) },
              { value: "all", label: t("settings.toolsets.scopeAll", { defaultValue: "All toolsets" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          E,
          {
            icon: /* @__PURE__ */ e.jsx(Ce, {}),
            onClick: _,
            loading: $,
            children: a("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          E,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ue, {}),
            onClick: z,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: Ze,
        dataSource: (N == null ? void 0 : N.data) || [],
        loading: $,
        rowKey: "id",
        pagination: {
          total: (N == null ? void 0 : N.total) || 0,
          current: (N == null ? void 0 : N.current) || 1,
          pageSize: (N == null ? void 0 : N.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (u, S) => a("pagination.total", {
            defaultValue: `${S[0]}-${S[1]} of ${u} items`,
            start: S[0],
            end: S[1],
            total: u
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: c ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        loading: !p,
        destroyOnHidden: !0,
        afterClose: Re,
        onCancel: Te,
        footer: null,
        width: ((h = R == null ? void 0 : R.ui_schema) == null ? void 0 : h["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          o,
          {
            form: n,
            layout: "vertical",
            onFinish: me,
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
                      fl,
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
                      H,
                      {
                        loading: j,
                        placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                        onChange: ae,
                        value: q,
                        options: Z.map((u) => ({
                          label: u.name,
                          value: u.tool_set_type
                        })),
                        showSearch: !0
                      }
                    )
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  gl,
                  {
                    name: "config",
                    schema: R == null ? void 0 : R.config_schema,
                    uiSchema: R == null ? void 0 : R.ui_schema,
                    type: q
                  }
                ),
                /* @__PURE__ */ e.jsx(o.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) })
              ] }),
              /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: B || je,
                    children: c ? a("update", { defaultValue: "Update" }) : a("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  E,
                  {
                    htmlType: "button",
                    icon: /* @__PURE__ */ e.jsx(It, {}),
                    loading: Ie,
                    onClick: Ae,
                    children: t("settings.toolsets.test", { defaultValue: "Test Connection" })
                  }
                ),
                /* @__PURE__ */ e.jsx(E, { onClick: Te, children: a("cancel", { defaultValue: "Cancel" }) })
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
        open: O,
        onCancel: () => I(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => I(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(M, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: U,
        onCancel: () => f(!1),
        footer: [
          /* @__PURE__ */ e.jsx(E, { onClick: () => f(!1), children: a("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: C ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(Ce, { style: { fontSize: 24 }, spin: !0 }) }) : W.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : W.map((u, S) => {
          var ee, X, te;
          return /* @__PURE__ */ e.jsx(
            ie,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(xt, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((ee = u.function) == null ? void 0 : ee.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Ke, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Se, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((X = u.function) == null ? void 0 : X.description) || "-" })
                ] }),
                ((te = u.function) == null ? void 0 : te.parameters) && /* @__PURE__ */ e.jsxs(Se, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(u.function.parameters, null, 2) })
                ] })
              ] })
            },
            S
          );
        }) })
      }
    )
  ] });
}, { TextArea: Pt } = V;
function xl(s, t) {
  const a = {}, l = [], n = new Map(t.map((i) => [i.id, i]));
  for (const i of s) {
    if (i.toolset_id === "*") {
      l.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
      continue;
    }
    const r = n.get(i.toolset_id);
    if (!r) {
      l.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
      continue;
    }
    const p = (r.tools || []).map((d) => d.name);
    if (i.tool_name === "*") {
      a[i.toolset_id] = [...p];
      continue;
    }
    p.includes(i.tool_name) ? (a[i.toolset_id] || (a[i.toolset_id] = []), a[i.toolset_id].includes(i.tool_name) || a[i.toolset_id].push(i.tool_name)) : l.push({ toolset_id: i.toolset_id, tool_name: i.tool_name });
  }
  return { selections: a, extraPatterns: l };
}
function yl(s, t) {
  const a = [], l = /* @__PURE__ */ new Set();
  for (const [n, i] of Object.entries(s))
    for (const r of i) {
      const p = `${n}|${r}`;
      l.has(p) || (l.add(p), a.push({ toolset_id: n, tool_name: r }));
    }
  for (const n of t) {
    const i = n.toolset_id.trim(), r = n.tool_name.trim();
    if (!i || !r)
      continue;
    const p = `${i}|${r}`;
    l.has(p) || (l.add(p), a.push({ toolset_id: i, tool_name: r }));
  }
  return a;
}
function is(s, t) {
  const a = t.trim();
  return !a || s.some((l) => l.value === a) ? s : [...s, { value: a, label: a }];
}
function jl(s, t, a, l) {
  const i = [{ value: "*", label: l }], r = /* @__PURE__ */ new Set(["*"]), p = (d, c) => {
    r.has(d) || (r.add(d), i.push({
      value: d,
      label: c ? `${d} — ${c}` : d
    }));
  };
  if (t && t !== "*") {
    const d = s.find((c) => c.id === t);
    for (const c of (d == null ? void 0 : d.tools) || [])
      p(c.name, c.description);
  } else
    for (const d of s)
      for (const c of d.tools || [])
        p(c.name, c.description);
  return is(i, a);
}
const bl = () => {
  const { message: s } = ge.useApp(), { t } = G("system"), { t: a } = G("common"), l = Fe(), { enableSkillToolBinding: n } = _t(), [i] = o.useForm(), [r, p] = x(""), [d, c] = x(), [m, b] = x("user"), [y, O] = x(!1), [I, M] = x(null), [v, q] = x(null), [w, U] = x(!1), [f] = o.useForm(), [W, Y] = x(!1), [J, le] = x(null), [Q, se] = x([]), [T, P] = x({}), [$, N] = x([]), [_, j] = x(!1), F = ke(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...Q.map((h) => ({
      value: h.id,
      label: `${h.name} (${h.id})`
    }))
  ], [Q, t]), R = Ve(() => {
    se([]), P({}), N([]);
  }, []), { loading: Z, data: B, refresh: ne } = A(
    () => k.system.listSkills({
      current: 1,
      page_size: 100,
      search: r || void 0,
      domain: d,
      is_preset: m === "user" ? !1 : void 0
    }),
    {
      refreshDeps: [r, d, m],
      onError: () => {
        s.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: je = [] } = A(() => k.system.listSkillDomains()), Pe = (B == null ? void 0 : B.data) || [], Le = (B == null ? void 0 : B.total) || 0, { run: Oe } = A(
    (h) => k.system.deleteSkill({ id: h }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), ne();
      },
      onError: () => {
        s.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), Ie = Ve(
    async (h, u) => {
      le(h.id);
      try {
        await k.system.updateSkillStatus({ id: h.id }, { status: u ? "enabled" : "disabled" }), s.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ne();
      } catch {
        s.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        le(null);
      }
    },
    [t, ne]
  ), { loading: ve, run: Ae } = A(
    (h) => k.system.uploadSkill(h.body, h.file),
    {
      manual: !0,
      onSuccess: () => {
        s.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), U(!1), f.resetFields(), ne();
      },
      onError: () => {
        s.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), C = Ve(
    async (h) => {
      var u;
      j(!0);
      try {
        const [S, ee] = await Promise.all([
          k.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          k.system.listSkillAiToolBindings(
            { id: h, current: 1, page_size: 1e3 }
          )
        ]), X = ((u = S.data) == null ? void 0 : u.filter((st) => st.status === "enabled")) || [];
        se(X);
        const { selections: te, extraPatterns: De } = xl(ee.data || [], X);
        P(te), N(De);
      } catch {
        s.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), R();
      } finally {
        j(!1);
      }
    },
    [R, t]
  );
  ze(() => {
    !y || !(I != null && I.id) || !n || C(I.id);
  }, [y, I == null ? void 0 : I.id, n, C]);
  const oe = (h, u) => {
    P((S) => ({ ...S, [h]: u }));
  }, be = (h, u, S) => {
    P((ee) => ({
      ...ee,
      [h]: S ? [...u] : []
    }));
  }, Te = () => {
    M(null), q(null), i.resetFields(), R(), O(!0);
  }, Re = (h) => {
    M(h), q(null), i.setFieldsValue({
      name: h.name,
      description: h.description,
      category: h.category,
      domain: h.domain
    }), R(), O(!0);
  }, z = (h) => {
    M(null), q(h), i.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: h.name, defaultValue: "{{name}} (copy)" }),
      description: h.description,
      category: h.category,
      domain: h.domain
    }), R(), O(!0);
  }, D = () => {
    i.validateFields().then(async (h) => {
      Y(!0);
      try {
        if (I) {
          const u = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          };
          if (await k.system.updateSkill({ id: I.id }, u), n) {
            const S = yl(T, $);
            await k.system.replaceSkillAiToolBindings(
              { id: I.id },
              { bindings: S }
            );
          }
          s.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (v) {
          const u = {
            source_id: v.id,
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? ""
          }, { id: S } = await k.system.cloneSkill(u);
          s.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), O(!1), q(null), i.resetFields(), R(), ne(), S && l(`/system/settings/skills/${S}/edit`);
          return;
        } else {
          const u = {
            name: h.name,
            description: h.description ?? "",
            category: h.category ?? "",
            domain: h.domain ?? "",
            content: h.content ?? ""
          };
          await k.system.createSkill(u), s.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        O(!1), M(null), q(null), i.resetFields(), R(), ne();
      } catch {
        s.error(
          I ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : v ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        Y(!1);
      }
    });
  }, ae = () => {
    var X, te;
    const h = (X = f.getFieldValue("file")) == null ? void 0 : X.fileList, u = ((te = h == null ? void 0 : h[0]) == null ? void 0 : te.originFileObj) ?? (h == null ? void 0 : h[0]);
    if (!u) {
      s.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const S = f.getFieldValue("category"), ee = f.getFieldValue("domain");
    Ae({ body: { category: S, domain: ee }, file: u });
  }, me = n && I, Ee = me ? 720 : 560, Qe = !I && !v, Ze = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (h, u) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: h }),
        u.is_preset ? /* @__PURE__ */ e.jsx(de, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (h) => h ? /* @__PURE__ */ e.jsx(de, { children: h }) : "-", width: 180 },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (h) => h ? /* @__PURE__ */ e.jsx(de, { color: "blue", children: h }) : "-", width: 180 },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (h, u) => {
        const S = u.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          pe,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(de, { color: S ? "green" : "red", children: S ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              ut,
              {
                title: S ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  ue,
                  {
                    size: "small",
                    checked: S,
                    loading: J === u.id,
                    onChange: (ee) => void Ie(u, ee)
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
      render: (h, u) => /* @__PURE__ */ e.jsx(
        $e,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(ot, {}),
              tooltip: u.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => l(`/system/settings/skills/${u.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!u.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Kt, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => l(`/system/settings/skills/${u.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(qe, {}),
              tooltip: u.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => Re(u),
              permission: "system:skills:update",
              disabled: !!u.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(Jt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => z(u),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
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
                onConfirm: async () => Oe(u.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ke, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: a("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: p,
            style: { width: 300 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          H,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 200 },
            value: d,
            onChange: c,
            options: je.map((h) => ({ value: h, label: h }))
          }
        ),
        /* @__PURE__ */ e.jsx(
          Je.Group,
          {
            optionType: "button",
            value: m,
            onChange: (h) => b(h.target.value),
            options: [
              { value: "user", label: t("settings.skills.scopeUser", { defaultValue: "User skills" }) },
              { value: "all", label: t("settings.skills.scopeAll", { defaultValue: "All skills" }) }
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Ce, {}), onClick: () => ne(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ue, {}), onClick: Te, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(pe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(At, {}), onClick: () => U(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ie, { children: [
      /* @__PURE__ */ e.jsx(
        Me,
        {
          rowKey: "id",
          loading: Z,
          columns: Ze,
          dataSource: Pe,
          pagination: { total: Le, pageSize: 10, showSizeChanger: !0 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        fe,
        {
          title: I ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : v ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
          open: y,
          onOk: D,
          onCancel: () => {
            O(!1), M(null), q(null), R();
          },
          confirmLoading: W,
          width: Ee,
          children: /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", autoComplete: "off", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(Pt, { rows: 2 }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(H, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: je.map((h) => ({ value: h, label: h })) }) }),
            Qe && /* @__PURE__ */ e.jsx(o.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(Pt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
            me && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(ye, { spinning: _, children: Q.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
              /* @__PURE__ */ e.jsx(K, { direction: "vertical", size: "middle", style: {
                width: "100%",
                overflow: "auto",
                maxHeight: "calc(100vh - 800px)",
                minHeight: "calc(300px)"
              }, children: Q.map((h) => {
                const u = (h.tools || []).map((te) => te.name), S = T[h.id] || [], ee = u.length > 0 && S.length === u.length, X = S.length > 0 && S.length < u.length;
                return /* @__PURE__ */ e.jsx(
                  ie,
                  {
                    size: "small",
                    title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ e.jsx(
                        pt,
                        {
                          checked: ee,
                          indeterminate: X,
                          onChange: (te) => be(h.id, u, te.target.checked)
                        }
                      ),
                      /* @__PURE__ */ e.jsx("span", { children: h.name })
                    ] }),
                    extra: h.description ? /* @__PURE__ */ e.jsx("span", { children: h.description }) : void 0,
                    children: (h.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(pt.Group, { style: { width: "100%" }, value: S, onChange: (te) => oe(h.id, te), children: /* @__PURE__ */ e.jsx(K, { direction: "vertical", style: { width: "100%" }, children: (h.tools || []).map((te) => /* @__PURE__ */ e.jsx(pt, { value: te.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                      /* @__PURE__ */ e.jsx("div", { children: te.name }),
                      te.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: te.description })
                    ] }) }, te.name)) }) }) : /* @__PURE__ */ e.jsx(
                      We,
                      {
                        image: We.PRESENTED_IMAGE_SIMPLE,
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
                /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, children: [
                  $.map((h, u) => /* @__PURE__ */ e.jsxs(
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
                          Tt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                            value: h.toolset_id,
                            options: is(F, h.toolset_id),
                            filterOption: (S, ee) => {
                              const X = ee;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes(S.toLowerCase());
                            },
                            onChange: (S) => {
                              const ee = typeof S == "string" ? S : "";
                              N(
                                (X) => X.map((te, De) => De === u ? { ...te, toolset_id: ee } : te)
                              );
                            }
                          }
                        ),
                        /* @__PURE__ */ e.jsx(
                          Tt,
                          {
                            allowClear: !0,
                            style: { flex: 1, minWidth: 0 },
                            placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                            value: h.tool_name,
                            options: jl(
                              Q,
                              h.toolset_id,
                              h.tool_name,
                              t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                            ),
                            filterOption: (S, ee) => {
                              const X = ee;
                              return `${(X == null ? void 0 : X.value) ?? ""} ${(X == null ? void 0 : X.label) ?? ""}`.toLowerCase().includes(S.toLowerCase());
                            },
                            onChange: (S) => {
                              const ee = typeof S == "string" ? S : "";
                              N(
                                (X) => X.map((te, De) => De === u ? { ...te, tool_name: ee } : te)
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
                            onClick: () => N((S) => S.filter((ee, X) => X !== u)),
                            children: a("delete", { defaultValue: "Delete" })
                          }
                        )
                      ]
                    },
                    u
                  )),
                  /* @__PURE__ */ e.jsx(E, { type: "dashed", onClick: () => N((h) => [...h, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                ] })
              ] })
            ] }) : /* @__PURE__ */ e.jsx(
              We,
              {
                image: We.PRESENTED_IMAGE_SIMPLE,
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
          open: w,
          onOk: ae,
          onCancel: () => U(!1),
          confirmLoading: ve,
          children: /* @__PURE__ */ e.jsxs(o, { form: f, layout: "vertical", children: [
            /* @__PURE__ */ e.jsx(o.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(hs, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(At, {}), children: a("selectFile", { defaultValue: "Select file" }) }) }) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
            /* @__PURE__ */ e.jsx(o.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(H, { allowClear: !0, placeholder: a("optional", { defaultValue: "Optional" }), options: je.map((h) => ({ value: h, label: h })) }) })
          ] })
        }
      )
    ] })
  ] });
}, Vl = () => {
  const { message: s } = ge.useApp(), t = Fe(), { t: a } = G("system"), { t: l } = G("task"), { t: n } = G("common"), [i] = o.useForm(), { data: r } = A(k.system.listLogStorageBackends), { data: p } = A(k.system.getTaskSettingFields), d = (r ?? []).map((v) => ({
    value: v.id,
    label: a(`settings.task.logStorage.${v.id}`, { defaultValue: v.name })
  })), { loading: c, refresh: m } = A(k.system.getTaskSettings, {
    onSuccess: (v) => {
      v && i.setFieldsValue(v);
    },
    onError: () => {
      s.error(a("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: b, run: y } = A(k.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      s.success(a("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), m();
    },
    onError: () => {
      s.error(a("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), O = (v) => {
    y(v);
  }, I = (v) => {
    switch (v.value_type) {
      case "int":
      case "number":
        return /* @__PURE__ */ e.jsx(
          ce,
          {
            style: { width: "100%" },
            addonAfter: v.key.includes("retention_days") ? a("settings.days", { defaultValue: "Days" }) : void 0
          }
        );
      case "percentage":
        return /* @__PURE__ */ e.jsx(ce, { style: { width: "100%" }, min: 0, max: 100, step: 0.01, addonAfter: "%" });
      case "bool":
        return /* @__PURE__ */ e.jsx(ue, {});
      case "string_list":
        return /* @__PURE__ */ e.jsx(H, { mode: "tags", tokenSeparators: [","] });
      case "enum":
        return /* @__PURE__ */ e.jsx(H, { options: v.enum_options || [] });
      case "rich_text":
        return /* @__PURE__ */ e.jsx(ls, { theme: "snow" });
      default:
        return /* @__PURE__ */ e.jsx(V, {});
    }
  }, M = (v) => v.value_type === "int" || v.value_type === "number" || v.value_type === "percentage" ? [{ type: "number" }] : [];
  return /* @__PURE__ */ e.jsx(ye, { spinning: c, children: /* @__PURE__ */ e.jsxs(
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
              H,
              {
                options: d,
                placeholder: a("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: r === void 0
              }
            )
          }
        ),
        (p ?? []).map((v) => /* @__PURE__ */ e.jsx(
          o.Item,
          {
            name: v.key,
            label: a(`settings.task.fields.${v.key}`, { defaultValue: v.key }),
            rules: M(v),
            valuePropName: v.value_type === "bool" ? "checked" : "value",
            children: I(v)
          },
          v.key
        )),
        /* @__PURE__ */ e.jsx(o.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", loading: b, icon: /* @__PURE__ */ e.jsx(Ge, {}), children: n("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(E, { onClick: () => m(), icon: /* @__PURE__ */ e.jsx(Ce, {}), children: n("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Gt, {}), onClick: () => t("/tasks"), children: l("listTitle", { defaultValue: "Task List" }) }),
          /* @__PURE__ */ e.jsx(pe, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Es, {}), onClick: () => t("/tasks/schedules"), children: l("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { Text: kl } = Ye, vl = [
  { value: "anonymous", label: "anonymous" },
  { value: "user", label: "user" },
  { value: "service_account", label: "service_account" }
], ft = { marginBottom: 0 }, _l = ({ onResetSubject: s }) => {
  const { t } = G("system"), { t: a } = G("common"), l = [
    { key: "anonymous", label: t("settings.rateLimit.anonymous", { defaultValue: "Anonymous (IP)" }) },
    { key: "user", label: t("settings.rateLimit.user", { defaultValue: "User" }) },
    { key: "service_account", label: t("settings.rateLimit.serviceAccount", { defaultValue: "Service account" }) }
  ], n = [
    { title: t("settings.rateLimit.subjectType", { defaultValue: "Subject" }), dataIndex: "label", width: 180 },
    {
      title: `${t("settings.rateLimit.rate", { defaultValue: "Rate" })} / ${t("settings.rateLimit.period", { defaultValue: "Period" })}`,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { style: ft, children: /* @__PURE__ */ e.jsxs(K.Compact, { children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "rate"], rules: [{ required: !0 }], noStyle: !0, children: /* @__PURE__ */ e.jsx(ce, { min: 1, style: { width: 88 } }) }),
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "period"], noStyle: !0, children: /* @__PURE__ */ e.jsx(V, { placeholder: "1m", style: { width: 72 } }) })
      ] }) })
    },
    {
      title: t("settings.rateLimit.burst", { defaultValue: "Burst" }),
      width: 120,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "burst"], style: ft, children: /* @__PURE__ */ e.jsx(ce, { min: 1, style: { width: "100%" } }) })
    },
    {
      title: `${t("settings.rateLimit.quota", { defaultValue: "Quota" })} / ${t("settings.rateLimit.quotaPeriod", { defaultValue: "Quota period" })}`,
      render: (i, r) => /* @__PURE__ */ e.jsx(o.Item, { style: ft, children: /* @__PURE__ */ e.jsxs(K.Compact, { children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "quota"], noStyle: !0, children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: 100 }, placeholder: "0" }) }),
        /* @__PURE__ */ e.jsx(o.Item, { name: [r.key, "quota_period"], noStyle: !0, children: /* @__PURE__ */ e.jsx(V, { placeholder: "1d", style: { width: 72 } }) })
      ] }) })
    },
    {
      title: a("actions", { defaultValue: "Actions" }),
      width: 64,
      render: (i, r) => /* @__PURE__ */ e.jsx($e, { actions: [
        {
          key: "reset",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(yt, {}),
          htmlType: "button",
          tooltip: t("settings.rateLimit.resetSubject", { defaultValue: "Reset counters" }),
          confirm: { title: t("settings.rateLimit.resetSubjectConfirm", { defaultValue: "Reset shared-bucket counters for this subject type?" }) },
          onClick: async () => {
            await (s == null ? void 0 : s(r.key));
          }
        }
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsx(
    Me,
    {
      size: "small",
      pagination: !1,
      rowKey: "key",
      columns: n,
      dataSource: l
    }
  );
}, Sl = () => {
  const { message: s } = ge.useApp(), { t } = G("system"), { t: a } = G("common"), { hasPermission: l } = St(), n = l("system:rate_limit:update"), [i] = o.useForm(), [r] = o.useForm(), [p, d] = x(!1), [c, m] = x(null), [b, y] = x({ current: 1, page_size: 10 }), [O, I] = x(""), { data: M, loading: v, refresh: q } = A(k.system.getRateLimitSettings, {
    onSuccess: ($) => i.setFieldsValue($),
    onError: () => s.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }))
  }), { loading: w, run: U } = A(k.system.updateRateLimitSettings, {
    manual: !0,
    onSuccess: () => {
      s.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), q();
    },
    onError: ($) => s.error($.message || t("settings.updateFailed", { defaultValue: "Failed to update settings" }))
  }), { data: f, loading: W, refresh: Y } = A(
    () => k.system.listRateLimitRules({ current: b.current, page_size: b.page_size, search: O || void 0 }),
    { refreshDeps: [b.current, b.page_size, O] }
  ), J = () => {
    m(null), r.resetFields(), r.setFieldsValue({ subject_type: "user", period: "1m", enabled: !0, method: "GET", quota: 0 }), d(!0);
  }, le = ($) => {
    m($), r.setFieldsValue($), d(!0);
  }, { run: Q, loading: se } = A(
    async ($) => {
      const N = { ...$, enabled: $.enabled !== !1 };
      return c != null && c.id ? k.system.updateRateLimitRule({ id: c.id }, N) : k.system.createRateLimitRule(N);
    },
    {
      manual: !0,
      onSuccess: () => {
        s.success(a("success", { defaultValue: "Operation successful" })), d(!1), Y();
      },
      onError: ($) => s.error($.message)
    }
  ), T = async ($) => {
    try {
      await k.system.resetRateLimitCounters($), s.success(t("settings.rateLimit.resetSuccess", { defaultValue: "Counters reset" }));
    } catch (N) {
      throw s.error(N instanceof Error ? N.message : t("settings.rateLimit.resetFailed", { defaultValue: "Failed to reset counters" })), N;
    }
  }, P = [
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
      render: ($, N) => /* @__PURE__ */ e.jsx($e, { actions: [
        {
          key: "edit",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(qe, {}),
          tooltip: a("edit", { defaultValue: "Edit" }),
          onClick: async () => {
            le(N);
          }
        },
        {
          key: "delete",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          danger: !0,
          tooltip: a("delete", { defaultValue: "Delete" }),
          confirm: { title: t("settings.rateLimit.deleteConfirm", { defaultValue: "Delete this rule?" }) },
          onClick: async () => {
            await k.system.deleteRateLimitRule({ id: N.id }), Y();
          }
        },
        {
          key: "reset",
          permission: "system:rate_limit:update",
          icon: /* @__PURE__ */ e.jsx(yt, {}),
          tooltip: t("settings.rateLimit.resetRule", { defaultValue: "Reset counters" }),
          confirm: { title: t("settings.rateLimit.resetRuleConfirm", { defaultValue: "Reset counters for this rule?" }) },
          onClick: async () => {
            await T({
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
  return /* @__PURE__ */ e.jsxs(ye, { spinning: v, children: [
    (M == null ? void 0 : M.memory_warn) && /* @__PURE__ */ e.jsx(
      nt,
      {
        type: "warning",
        showIcon: !0,
        style: { marginBottom: 16 },
        message: t("settings.rateLimit.memoryWarn", { defaultValue: "Cluster mode with in-memory store: limits are per node. Use rate_limit.store=redis for cluster-wide limits." })
      }
    ),
    /* @__PURE__ */ e.jsxs(o, { form: i, layout: "vertical", onFinish: U, disabled: !n, children: [
      /* @__PURE__ */ e.jsxs(K, { wrap: !0, align: "center", style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx(o.Item, { name: "enabled", label: t("settings.rateLimit.enabled", { defaultValue: "Enable rate limiting" }), valuePropName: "checked", style: { marginBottom: 0 }, children: /* @__PURE__ */ e.jsx(ue, {}) }),
        /* @__PURE__ */ e.jsxs(kl, { type: "secondary", children: [
          t("settings.rateLimit.storeLabel", { defaultValue: "Store" }),
          ": ",
          (M == null ? void 0 : M.store) || "memory",
          " · ",
          t("settings.rateLimit.failOpen", { defaultValue: "Fail open" }),
          ": ",
          String((M == null ? void 0 : M.fail_open) ?? !0)
        ] })
      ] }),
      /* @__PURE__ */ e.jsx(Xe, { children: t("settings.rateLimit.defaults", { defaultValue: "Default shared buckets" }) }),
      /* @__PURE__ */ e.jsx(
        _l,
        {
          onResetSubject: ($) => T({
            scope: "subject",
            subject_type: $,
            subject_id: "",
            rule_id: ""
          })
        }
      ),
      /* @__PURE__ */ e.jsx(pe, { permission: "system:rate_limit:update", children: /* @__PURE__ */ e.jsxs(K, { style: { marginTop: 12 }, children: [
        /* @__PURE__ */ e.jsx(E, { type: "primary", htmlType: "submit", icon: /* @__PURE__ */ e.jsx(Ge, {}), loading: w, children: a("save", { defaultValue: "Save" }) }),
        /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Ce, {}), onClick: () => q(), children: a("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(
          Ht,
          {
            title: t("settings.rateLimit.resetAllConfirm", { defaultValue: "Reset every rate-limit and quota counter? Currently blocked clients will be allowed immediately." }),
            onConfirm: () => T({
              scope: "global",
              subject_type: "anonymous",
              subject_id: "",
              rule_id: ""
            }),
            children: /* @__PURE__ */ e.jsx(E, { danger: !0, htmlType: "button", icon: /* @__PURE__ */ e.jsx(yt, {}), children: t("settings.rateLimit.resetAll", { defaultValue: "Reset all counters" }) })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(Xe, { children: t("settings.rateLimit.routeRules", { defaultValue: "Route rules" }) }),
    /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ e.jsx(
        V.Search,
        {
          allowClear: !0,
          placeholder: a("search", { defaultValue: "Search" }),
          onSearch: ($) => {
            I($), y((N) => ({ ...N, current: 1 }));
          },
          style: { width: 240 }
        }
      ),
      /* @__PURE__ */ e.jsx(pe, { permission: "system:rate_limit:update", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ue, {}), onClick: J, children: a("create", { defaultValue: "Create" }) }) }),
      /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Ce, {}), onClick: () => Y(), children: a("refresh", { defaultValue: "Refresh" }) })
    ] }),
    /* @__PURE__ */ e.jsx(
      Me,
      {
        rowKey: "id",
        loading: W,
        columns: P,
        dataSource: (f == null ? void 0 : f.data) || [],
        pagination: {
          current: (f == null ? void 0 : f.current) || b.current,
          pageSize: (f == null ? void 0 : f.page_size) || b.page_size,
          total: (f == null ? void 0 : f.total) || 0,
          onChange: ($, N) => y({ current: $, page_size: N })
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        open: p,
        title: c ? t("settings.rateLimit.editRule", { defaultValue: "Edit rule" }) : t("settings.rateLimit.createRule", { defaultValue: "Create rule" }),
        onCancel: () => d(!1),
        onOk: () => r.submit(),
        confirmLoading: se,
        destroyOnClose: !0,
        children: /* @__PURE__ */ e.jsxs(o, { form: r, layout: "vertical", onFinish: Q, disabled: !n, children: [
          /* @__PURE__ */ e.jsx(o.Item, { name: "subject_type", label: t("settings.rateLimit.subjectType", { defaultValue: "Subject" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(H, { options: vl }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "subject_id", label: t("settings.rateLimit.subjectId", { defaultValue: "Subject ID" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: t("settings.rateLimit.subjectIdHint", { defaultValue: "Empty = all subjects of this type" }) }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "method", label: t("settings.rateLimit.method", { defaultValue: "Method" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "GET" }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "path", label: t("settings.rateLimit.path", { defaultValue: "Path" }), extra: t("settings.rateLimit.pathHint", { defaultValue: "Gin full path, e.g. /api/ai/chat/sessions/:sessionId. Empty = shared bucket." }), children: /* @__PURE__ */ e.jsx(V, {}) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "rate", label: t("settings.rateLimit.rate", { defaultValue: "Rate" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(ce, { min: 1, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "period", label: t("settings.rateLimit.period", { defaultValue: "Period" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "1m" }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "burst", label: t("settings.rateLimit.burst", { defaultValue: "Burst" }), children: /* @__PURE__ */ e.jsx(ce, { min: 1, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "quota", label: t("settings.rateLimit.quota", { defaultValue: "Quota" }), children: /* @__PURE__ */ e.jsx(ce, { min: 0, style: { width: "100%" } }) }),
          /* @__PURE__ */ e.jsx(o.Item, { name: "quota_period", label: t("settings.rateLimit.quotaPeriod", { defaultValue: "Quota period" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: "1d" }) }),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "enabled",
              label: t("settings.rateLimit.enabled", { defaultValue: "Enabled" }),
              valuePropName: "checked",
              initialValue: !0,
              extra: t("settings.rateLimit.enabledHint", { defaultValue: "Off: this rule is ignored and the next layer applies." }),
              children: /* @__PURE__ */ e.jsx(ue, {})
            }
          )
        ] })
      }
    )
  ] });
}, { TextArea: wl } = V, Cl = /^[-_a-zA-Z0-9.]+$/, Tl = () => {
  const { message: s, modal: t } = ge.useApp(), a = Fe(), { t: l, i18n: n } = G("system"), { t: i } = G("common"), r = (_) => {
    if (!_) return "-";
    const j = new Date(_);
    return Number.isNaN(j.getTime()) ? "-" : j.toLocaleString(n.language, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }, [p] = o.useForm(), [d, c] = x(!1), [m, b] = x(null), [y, O] = x(""), [I, M] = x(1), [v, q] = x(10), { loading: w, data: U, refresh: f } = A(
    () => Ws({ current: I, page_size: v, search: y }),
    {
      refreshDeps: [I, v, y],
      onError: (_) => {
        s.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", _);
      }
    }
  ), { loading: W, run: Y } = A(
    (_) => Ks(_),
    {
      manual: !0,
      onSuccess: () => {
        s.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), c(!1), p.resetFields(), b(null), f();
      },
      onError: (_) => {
        s.error((_ == null ? void 0 : _.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: J, run: le } = A(
    ({ id: _, ...j }) => Gs({ id: _ }, j),
    {
      manual: !0,
      onSuccess: () => {
        s.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), c(!1), p.resetFields(), b(null), f();
      },
      onError: (_) => {
        s.error((_ == null ? void 0 : _.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: Q } = A(
    (_) => Qs({ id: _ }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), f();
      },
      onError: (_) => {
        s.error((_ == null ? void 0 : _.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), se = () => {
    b(null), p.resetFields(), p.setFieldsValue({ status: "active" }), c(!0);
  }, T = (_) => {
    b(_), p.setFieldsValue({
      name: _.name,
      slug: _.slug,
      description: _.description,
      status: _.status
    }), c(!0);
  }, P = (_) => {
    t.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${_.name}"? This action cannot be undone.`
      }),
      onOk: () => Q(_.id)
    });
  }, $ = () => {
    p.validateFields().then((_) => {
      m ? le({ id: m.id, ..._ }) : Y(_);
    });
  }, N = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: l("settings.organizations.slug", { defaultValue: "Slug" }),
      dataIndex: "slug",
      key: "slug",
      render: (_) => _ || "-"
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
      render: (_) => /* @__PURE__ */ e.jsx(de, { color: _ === "active" ? "green" : "default", children: _ === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("settings.organizations.createdAt", { defaultValue: "Created At" }),
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (_) => r(_)
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (_, j) => /* @__PURE__ */ e.jsx(
        $e,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Kt, {}),
              onClick: async () => a(`/system/settings/organizations/${j.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(qe, {}),
              onClick: async () => T(j),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              danger: !0,
              onClick: async () => P(j),
              permission: "system:organization:delete"
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
        style: { marginBottom: 16 },
        children: /* @__PURE__ */ e.jsxs(Ke, { justify: "space-between", align: "middle", children: [
          /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (_) => {
                O(_), M(1);
              },
              style: { width: 300 }
            }
          ) }),
          /* @__PURE__ */ e.jsx(Se, { children: /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Ce, {}), onClick: f, children: i("refresh", { defaultValue: "Refresh" }) }),
            /* @__PURE__ */ e.jsx(pe, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ue, {}), onClick: se, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(
      Me,
      {
        columns: N,
        dataSource: (U == null ? void 0 : U.data) || [],
        loading: w,
        rowKey: "id",
        pagination: {
          current: I,
          pageSize: v,
          total: (U == null ? void 0 : U.total) || 0,
          showSizeChanger: !0,
          showTotal: (_, j) => i("pagination.total", {
            defaultValue: `${j[0]}-${j[1]} of ${_} items`,
            start: j[0],
            end: j[1],
            total: _
          }),
          onChange: (_, j) => {
            M(_), q(j);
          }
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      fe,
      {
        title: m ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
        open: d,
        onOk: $,
        onCancel: () => {
          c(!1), p.resetFields(), b(null);
        },
        confirmLoading: W || J,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: p, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "name",
              label: l("settings.organizations.name", { defaultValue: "Name" }),
              rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
              children: /* @__PURE__ */ e.jsx(V, {})
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "slug",
              label: l("settings.organizations.slug", { defaultValue: "Slug" }),
              tooltip: l("settings.organizations.slugTooltip", { defaultValue: "Optional unique identifier. Only letters, digits, hyphens, underscores, and dots are allowed." }),
              rules: [{
                pattern: Cl,
                message: l("settings.organizations.slugInvalid", { defaultValue: "Slug may only contain letters, digits, hyphens, underscores, and dots" })
              }],
              children: /* @__PURE__ */ e.jsx(V, { placeholder: "my-org" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "description",
              label: l("settings.organizations.description", { defaultValue: "Description" }),
              children: /* @__PURE__ */ e.jsx(wl, { rows: 3 })
            }
          ),
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              name: "status",
              label: l("settings.organizations.status", { defaultValue: "Status" }),
              rules: [{ required: !0 }],
              children: /* @__PURE__ */ e.jsxs(H, { children: [
                /* @__PURE__ */ e.jsx(H.Option, { value: "active", children: l("settings.organizations.active", { defaultValue: "Active" }) }),
                /* @__PURE__ */ e.jsx(H.Option, { value: "disabled", children: l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
              ] })
            }
          )
        ] })
      }
    )
  ] });
}, Fl = ({
  transformItems: s = (t) => t
}) => {
  const { t } = G("system"), a = Fe(), l = Js(), r = l.hash.replace("#", "") || "base", { enableMultiOrg: p } = _t(), { hasPermission: d } = St(), c = [
    {
      key: "base",
      label: t("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(cl, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "security",
      label: t("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(ol, {}),
      hidden: !d("system:security:update")
    },
    {
      key: "oauth",
      label: t("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(nl, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ldap",
      label: t("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(dl, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "smtp",
      label: t("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(ul, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "ai-models",
      label: t("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(pl, {}),
      hidden: !d("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: t("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(hl, {}),
      hidden: !d("system:toolsets:view")
    },
    {
      key: "skills",
      label: t("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(bl, {}),
      hidden: !d("system:skills:view")
    },
    {
      key: "task",
      label: t("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(Vl, {}),
      hidden: !d("system:settings:update")
    },
    {
      key: "rate-limit",
      label: t("settings.tabs.rateLimit", { defaultValue: "Rate Limit" }),
      children: /* @__PURE__ */ e.jsx(Sl, {}),
      hidden: !d("system:rate_limit:view") && !d("system:rate_limit:update")
    },
    // Only show organization tab if multi-org is enabled
    ...p ? [{
      key: "organizations",
      label: t("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Tl, {}),
      hidden: !d("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(ie, { title: t("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Bt,
    {
      defaultActiveKey: r,
      onChange: (m) => {
        a(`${l.pathname}#${m}`);
      },
      items: s(c.filter((m) => !m.hidden), t)
    }
  ) });
}, ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fl
}, Symbol.toStringTag, { value: "Module" })), Il = () => {
  var Ie, ve, Ae;
  const { message: s, modal: t } = ge.useApp(), a = Fe(), { id: l } = mt(), { t: n } = G("system"), { t: i } = G("common"), [r] = o.useForm(), [p] = o.useForm(), [d, c] = x(!1), [m, b] = x(!1), [y, O] = x(null), [I, M] = x(""), [v, q] = x(1), [w, U] = x(10), { data: f, loading: W, refresh: Y } = A(
    () => Zs({ id: l }),
    {
      ready: !!l,
      onError: (C) => {
        s.error(n("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", C);
      }
    }
  ), { data: J, loading: le, refresh: Q } = A(
    () => Xs({ id: l, current: v, page_size: w, search: I }),
    {
      ready: !!l,
      refreshDeps: [l, v, w, I],
      onError: (C) => {
        s.error(n("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", C);
      }
    }
  ), { data: se, loading: T } = A(
    () => sl({ current: 1, page_size: 1e3 }),
    {
      ready: d
    }
  ), { data: P, loading: $ } = A(
    () => ll({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: N, run: _ } = A(
    (C) => Ys({ id: l }, C),
    {
      manual: !0,
      onSuccess: () => {
        s.success(n("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), c(!1), r.resetFields(), Q();
      },
      onError: (C) => {
        s.error((C == null ? void 0 : C.err) || n("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: j, run: F } = A(
    (C) => el({ id: l, user_id: y.id }, C),
    {
      manual: !0,
      onSuccess: () => {
        s.success(n("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), b(!1), p.resetFields(), O(null), Q();
      },
      onError: (C) => {
        s.error((C == null ? void 0 : C.err) || n("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: R } = A(
    (C) => tl({ id: l, user_id: C }),
    {
      manual: !0,
      onSuccess: () => {
        s.success(n("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), Q();
      },
      onError: (C) => {
        s.error((C == null ? void 0 : C.err) || n("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), Z = () => {
    c(!0), r.resetFields();
  }, B = (C) => {
    var oe;
    O(C), p.setFieldsValue({
      role_ids: ((oe = C.organization_roles) == null ? void 0 : oe.map((be) => be.id)) || []
    }), b(!0);
  }, ne = (C) => {
    t.confirm({
      title: n("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: n("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${C.full_name || C.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => R(C.id)
    });
  }, je = () => {
    r.validateFields().then((C) => {
      _(C);
    });
  }, Pe = () => {
    p.validateFields().then((C) => {
      F(C);
    });
  }, Le = ((Ie = se == null ? void 0 : se.data) == null ? void 0 : Ie.filter((C) => {
    var oe;
    return !((oe = J == null ? void 0 : J.data) != null && oe.some((be) => be.id === C.id));
  })) || [], Oe = [
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
      render: (C) => /* @__PURE__ */ e.jsx(de, { color: C === "active" ? "green" : "default", children: C === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : C })
    },
    {
      title: n("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (C, oe) => {
        var be;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((be = oe.organization_roles) == null ? void 0 : be.map((Te) => /* @__PURE__ */ e.jsx(de, { children: Te.name }, Te.id))) || /* @__PURE__ */ e.jsx(de, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (C, oe) => /* @__PURE__ */ e.jsx(
        $e,
        {
          actions: [
            {
              key: "edit",
              label: n("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(qe, {}),
              onClick: async () => B(oe)
            },
            {
              key: "delete",
              label: n("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(Ne, {}),
              danger: !0,
              onClick: async () => ne(oe)
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
        title: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            E,
            {
              icon: /* @__PURE__ */ e.jsx(kt, {}),
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
        extra: /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Ce, {}), onClick: () => {
          Y(), Q();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: W,
        children: /* @__PURE__ */ e.jsxs(he, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(he.Item, { label: n("settings.organizations.name", { defaultValue: "Name" }), children: f == null ? void 0 : f.name }),
          /* @__PURE__ */ e.jsx(he.Item, { label: n("settings.organizations.slug", { defaultValue: "Slug" }), children: (f == null ? void 0 : f.slug) || "-" }),
          /* @__PURE__ */ e.jsx(he.Item, { label: n("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(de, { color: (f == null ? void 0 : f.status) === "active" ? "green" : "default", children: (f == null ? void 0 : f.status) === "active" ? n("settings.organizations.active", { defaultValue: "Active" }) : n("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(he.Item, { label: n("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (f == null ? void 0 : f.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      ie,
      {
        title: n("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ue, {}), onClick: Z, children: n("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: n("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (C) => {
                M(C), q(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Me,
            {
              columns: Oe,
              dataSource: (J == null ? void 0 : J.data) || [],
              loading: le,
              rowKey: "id",
              pagination: {
                current: v,
                pageSize: w,
                total: (J == null ? void 0 : J.total) || 0,
                showSizeChanger: !0,
                showTotal: (C) => i("pagination.total", { defaultValue: `Total ${C} items` }),
                onChange: (C, oe) => {
                  q(C), U(oe);
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
        onOk: je,
        onCancel: () => {
          c(!1), r.resetFields();
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
                H,
                {
                  showSearch: !0,
                  placeholder: n("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: T,
                  filterOption: (C, oe) => ((oe == null ? void 0 : oe.label) ?? "").toLowerCase().includes(C.toLowerCase()),
                  options: Le.map((C) => ({
                    label: `${C.full_name || C.username} (${C.email})`,
                    value: C.id
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
                H,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: $,
                  options: ((ve = P == null ? void 0 : P.data) == null ? void 0 : ve.map((C) => ({
                    label: C.name,
                    value: C.id
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
        open: m,
        onOk: Pe,
        onCancel: () => {
          b(!1), p.resetFields(), O(null);
        },
        confirmLoading: j,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(o, { form: p, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            o.Item,
            {
              label: n("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  value: (y == null ? void 0 : y.full_name) || (y == null ? void 0 : y.username),
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
                H,
                {
                  mode: "multiple",
                  placeholder: n("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: $,
                  options: ((Ae = P == null ? void 0 : P.data) == null ? void 0 : Ae.map((C) => ({
                    label: C.name,
                    value: C.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, ba = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Il
}, Symbol.toStringTag, { value: "Module" })), Al = Vt(() => import("./markdown-viewer.js")), El = wt(({ css: s }) => ({
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
})), { TextArea: Lt } = V, zl = (s) => s.toLowerCase().endsWith(".md");
function ns(s) {
  return s.map((t) => {
    var a;
    return {
      key: t.path,
      title: t.name,
      isLeaf: !t.is_dir,
      icon: t.is_dir ? /* @__PURE__ */ e.jsx(Qt, {}) : /* @__PURE__ */ e.jsx(Zt, {}),
      children: (a = t.children) != null && a.length ? ns(t.children) : void 0
    };
  });
}
function gt(s) {
  return s.includes("/") ? s.replace(/\/[^/]+$/, "") : "";
}
const Pl = () => {
  const { message: s, modal: t } = ge.useApp(), { styles: a } = El(), { id: l } = mt(), n = Fe(), { t: i } = G("system"), [r, p] = x(null), [d, c] = x(null), [m, b] = x(!1), [y, O] = x(""), [I, M] = x(!1), [v, q] = x([]), [w, U] = x(!1), [f, W] = x(!1), [Y, J] = x(""), [le] = o.useForm(), [Q, se] = x(null), [T, P] = x(null), [$, N] = x(""), [_] = o.useForm(), { data: j } = A(
    () => l ? k.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: F, loading: R, refresh: Z } = A(
    () => l ? k.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (z) => {
        if (!r) {
          for (const D of z)
            if (!D.is_dir && D.name === "SKILL.md") {
              c(D.path), p(D.path), b(!1);
              return;
            }
          for (const D of z)
            if (!D.is_dir && D.name === "SKILLS.md") {
              c(D.path), p(D.path), b(!1);
              return;
            }
        }
      }
    }
  ), B = !!(j != null && j.is_preset), ne = ke(() => ns(F || []), [F]), je = m && d ? d : r ? gt(r) : "", { loading: Pe } = A(() => !l || !r ? Promise.reject(new Error("No id or selected file")) : k.system.getSkillFile({ id: l, path: r || "" }), {
    refreshDeps: [l, r],
    ready: !!l && !!r,
    onSuccess: (z) => {
      O(z.data);
    },
    onBefore: () => {
      O("");
    },
    onError: () => s.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))
  }), Le = () => {
    !l || !r || B || k.system.putSkillFile({ id: l, path: r }, y).then(() => {
      s.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), M(!1);
    }).catch(() => s.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, Oe = (z, D) => {
    const ae = String(D.node.key), me = !D.node.isLeaf;
    c(ae), b(me), D.node.isLeaf ? p(ae) : p(null);
  }, Ie = (z) => {
    z.event.preventDefault(), se({
      path: String(z.node.key),
      isDir: !z.node.isLeaf,
      x: z.event.clientX,
      y: z.event.clientY
    });
  }, ve = Ve(() => se(null), []), Ae = Ve(
    (z) => {
      if (!l || !Q || B) return;
      const { path: D, isDir: ae } = Q;
      switch (ve(), z) {
        case "open":
          p(D), c(D), b(!1);
          break;
        case "rename": {
          const me = D.includes("/") ? D.split("/").pop() : D;
          P({ path: D, isDir: ae }), N(me), setTimeout(() => _.setFieldsValue({ name: me }), 0);
          break;
        }
        case "delete":
          t.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: ae ? i("settings.skills.editor.deleteConfirmContentDir", { path: D, defaultValue: `Delete ${D}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: D, defaultValue: `Delete ${D}?` }),
            onOk: () => k.system.deleteSkillPath({ id: l, path: D }).then(() => {
              s.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === D && (p(null), O("")), d === D && (c(null), b(!1)), Z();
            }).catch(() => s.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          c(D), b(ae), U(!0);
          break;
        case "newDir":
          c(D), b(ae), W(!0);
          break;
      }
    },
    [l, Q, ve, Z, r, d, _, i, B]
  ), C = () => {
    if (!l || !T || B) return;
    const z = (_.getFieldValue("name") ?? $).trim();
    if (!z) {
      s.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!T.isDir && !/\.(md|txt)$/i.test(z)) {
      s.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const D = gt(T.path), ae = D ? `${D}/${z}` : z;
    if (ae === T.path) {
      P(null);
      return;
    }
    k.system.moveSkillPath({ id: l }, { from_path: T.path, to_path: ae }).then(() => {
      s.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), r === T.path && p(ae), d === T.path && c(ae), P(null), Z();
    }).catch(() => s.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, oe = (z) => {
    if (!l || B) return;
    const D = String(z.dragNode.key), ae = String(z.dragNode.title);
    let me;
    if (z.dropToGap) {
      const Ee = gt(String(z.node.key));
      me = Ee ? `${Ee}/${ae}` : ae;
    } else
      me = `${z.node.key}/${ae}`;
    me !== D && k.system.moveSkillPath({ id: l }, { from_path: D, to_path: me }).then(() => {
      s.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), r === D && p(me), d === D && c(me), Z();
    }).catch(() => s.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, be = () => {
    const z = Y.trim();
    if (!z || !l || B) return;
    const D = je ? `${je}/${z}` : z;
    if (!/\.(md|txt)$/i.test(z)) {
      s.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    k.system.putSkillFile({ id: l, path: D }, "").then(() => {
      s.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), U(!1), J(""), Z(), p(D), O("");
    }).catch(() => s.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, Te = () => {
    var ae;
    const z = (ae = le.getFieldValue("name")) == null ? void 0 : ae.trim();
    if (!z || !l || B) return;
    const D = je ? `${je}/${z}` : z;
    k.system.createSkillDir({ id: l }, { path: D }).then(() => {
      s.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), W(!1), le.resetFields(), Z();
    }).catch(() => s.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, Re = () => {
    const z = d || r;
    !l || !z || B || t.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: z, defaultValue: `Delete ${z}?` }),
      onOk: () => k.system.deleteSkillPath({ id: l, path: z }).then(() => {
        s.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), r === z && (p(null), O("")), d === z && (c(null), b(!1)), Z();
      }).catch(() => s.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    ie,
    {
      title: (j == null ? void 0 : j.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => n("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        B ? /* @__PURE__ */ e.jsx(
          nt,
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
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Ue, {}), disabled: B, onClick: () => U(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(E, { size: "small", icon: /* @__PURE__ */ e.jsx(Qt, {}), disabled: B, onClick: () => W(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            R ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              xs,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !B,
                expandedKeys: v,
                onExpand: (z) => q(z),
                selectedKeys: d ? [d] : [],
                onSelect: Oe,
                onRightClick: B ? void 0 : Ie,
                onDrop: oe,
                className: a.fileTree,
                treeData: ne
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            r && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: r }),
                /* @__PURE__ */ e.jsx(E, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ge, {}), disabled: B || !I, onClick: Le, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(E, { danger: !0, icon: /* @__PURE__ */ e.jsx(Ne, {}), disabled: B, onClick: Re, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              /* @__PURE__ */ e.jsx(ye, { spinning: Pe, wrapperClassName: al(a.editorSpin, "ez-editor-spin"), children: zl(r) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  Lt,
                  {
                    value: y,
                    readOnly: B,
                    onChange: (z) => {
                      O(z.target.value), M(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(bt, { fallback: /* @__PURE__ */ e.jsx(vt, {}), children: /* @__PURE__ */ e.jsx(Al, { content: ts(y) }) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                Lt,
                {
                  value: y,
                  readOnly: B,
                  onChange: (z) => {
                    O(z.target.value), M(!0);
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
              onClick: ve,
              onContextMenu: (z) => z.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: Q.x, top: Q.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            ys,
            {
              selectable: !1,
              items: [
                ...Q.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Zt, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(qe, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(Ne, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(zs, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Ps, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: z }) => Ae(z)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: w, onOk: be, onCancel: () => {
          U(!1), J("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: Y, onChange: (z) => J(z.target.value) }) }),
        /* @__PURE__ */ e.jsx(fe, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: f, onOk: () => le.validateFields().then(Te), onCancel: () => W(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(o, { form: le, layout: "vertical", children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          fe,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!T,
            onOk: C,
            onCancel: () => P(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(o, { form: _, layout: "vertical", onValuesChange: (z, D) => N(D.name ?? ""), children: /* @__PURE__ */ e.jsx(o.Item, { name: "name", label: T != null && T.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: T != null && T.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => C()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pl
}, Symbol.toStringTag, { value: "Module" })), Ll = Vt(() => import("./markdown-viewer.js")), Ol = () => {
  const { message: s } = ge.useApp(), { id: t } = mt(), a = Fe(), { t: l } = G("system"), { data: n, loading: i } = A(
    () => t ? k.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: r, loading: p, mutate: d } = A(
    () => t ? k.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onError: () => s.error(l("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })),
      onBefore: () => d()
    }
  ), c = ke(() => r == null ? void 0 : r.map((b) => ({
    key: b.file_name,
    label: b.file_name,
    children: /* @__PURE__ */ e.jsx(bt, { fallback: /* @__PURE__ */ e.jsx(vt, {}), children: /* @__PURE__ */ e.jsx(Ll, { content: ts(b.content) }) })
  })), [r]);
  if (!t) return null;
  const m = i || p;
  return /* @__PURE__ */ e.jsx(ye, { spinning: m, children: /* @__PURE__ */ e.jsx(
    ie,
    {
      title: (n == null ? void 0 : n.name) ?? l("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(E, { type: "link", onClick: () => a("/system/settings#skills"), children: l("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      tabList: c
    }
  ) });
}, ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ol
}, Symbol.toStringTag, { value: "Module" })), { Text: xe, Title: Rl } = Ye, jt = ["agent", "llm", "tool"], Ot = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(qs, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Ds, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Ns, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(xt, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(ot, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Ms, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(ot, {}) }
}, Rt = {
  agent: "#1677ff",
  llm: "#52c41a",
  tool: "#fa8c16"
}, Ml = {
  llm_request: "#1677ff",
  llm_response: "#52c41a",
  tool_call: "#fa8c16",
  tool_result: "#13c2c2",
  token_usage: "#722ed1",
  error: "#ff4d4f",
  summary: "#2f54eb"
}, os = wt(({ css: s }) => ({
  rawToggleWrap: s`
  position: relative;
  .json-block-mode-toggle{
    right: 90px !important;
  }
`,
  rawToggleHeader: s`
    position: absolute;
    top: 6px;
    right: 20px;
    z-index: 2;
  `
})), rs = wt(({ token: s, css: t }) => ({
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
  `,
  tokenPanel: t`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: inherit;
    overflow: auto;
  `,
  tokenGrid: t`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  `,
  tokenStat: t`
    padding: 8px 12px;
    border-radius: ${s.borderRadius}px;
    background: ${s.colorFillQuaternary};
    .ant-statistic-title {
      margin-bottom: 2px;
      font-size: 12px;
    }
    .ant-statistic-content {
      font-size: 20px;
      font-variant-numeric: tabular-nums;
    }
  `,
  cacheHint: t`
    display: block;
    margin-top: 6px;
    font-size: 12px;
  `
}));
function ds(s) {
  const { parsed: t, isJSON: a } = et(s);
  return a && typeof t == "object" && t !== null ? { text: s, value: t } : { text: s };
}
function Mt(s) {
  if (typeof s == "string") return { text: s };
  const t = JSON.stringify(s, null, 2);
  return typeof s == "object" && s !== null ? { text: t, value: s } : { text: t };
}
function Nl(s) {
  const t = s.map((l) => {
    const { parsed: n, isJSON: i } = et(l.content);
    return {
      event: l,
      isJSON: i,
      parsed: n,
      display: {
        text: l.content,
        value: i && typeof n == "object" && n !== null ? n : void 0
      }
    };
  });
  let a = null;
  for (const l of t) {
    const n = l.event.event_type;
    if (n === "llm_request") {
      a = l;
      continue;
    }
    if (n !== "llm_response") continue;
    const i = l.display.value;
    if (i && ("raw_request" in i || "raw_response" in i)) {
      const { raw_request: r, raw_response: p, ...d } = i;
      l.display = { text: JSON.stringify(d, null, 2), value: d }, r !== void 0 && a && (a.rawRequest = Mt(r)), p !== void 0 && (l.rawResponse = Mt(p));
    }
    a = null;
  }
  return t;
}
const tt = ({ children: s, fallback: t }) => {
  const [a, l] = x(!1);
  return ze(() => {
    let n = 0;
    const i = window.requestAnimationFrame(() => {
      n = window.requestAnimationFrame(() => l(!0));
    });
    return () => {
      window.cancelAnimationFrame(i), window.cancelAnimationFrame(n);
    };
  }, []), a ? /* @__PURE__ */ e.jsx(e.Fragment, { children: s }) : /* @__PURE__ */ e.jsx(e.Fragment, { children: t ?? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: "16px 0" }, children: /* @__PURE__ */ e.jsx(ye, { size: "small" }) }) });
}, we = ({
  payload: s,
  maxHeight: t
}) => {
  const [a, l] = x("raw"), n = /* @__PURE__ */ e.jsx(
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
      children: s.text
    }
  );
  return s.value ? /* @__PURE__ */ e.jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ e.jsx("div", { className: "json-block-mode-toggle", style: { position: "absolute", top: 6, right: 6, zIndex: 2 }, children: /* @__PURE__ */ e.jsx(
      ct,
      {
        size: "small",
        value: a,
        onChange: (i) => l(i),
        options: [
          { value: "raw", icon: /* @__PURE__ */ e.jsx(Yt, {}), title: "Raw" },
          { value: "json", icon: /* @__PURE__ */ e.jsx(es, {}), title: "JSON" }
        ]
      }
    ) }),
    a === "json" ? /* @__PURE__ */ e.jsx(tt, { children: /* @__PURE__ */ e.jsx(
      rt,
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
        value: s.value
      }
    ) }) : n
  ] }) : n;
};
function Dl(s) {
  return s.cache_read_tokens != null || s.cache_write_tokens != null;
}
function us(s, t) {
  return s <= 0 || t <= 0 ? 0 : Math.min(100, Math.round(t / s * 1e3) / 10);
}
function ql(s) {
  if (!s || s.total_tokens == null) return "";
  const t = s.total_tokens.toLocaleString();
  return s.cache_read_tokens == null || s.prompt_tokens <= 0 || s.cache_read_tokens <= 0 ? ` · ${t}` : ` · ${t} · cache ${us(s.prompt_tokens, s.cache_read_tokens)}%`;
}
const ht = "#ff4d4f";
function cs(s, t) {
  if (!t || !s) return !1;
  if (typeof s.ok == "boolean") return !s.ok;
  const a = (s.result || "").trim();
  return a ? !!(a === "tool call failed" || /^unknown tool:/i.test(a) || /^tool .+ failed:/i.test(a)) : !1;
}
const Ul = ({
  entry: s,
  t,
  maxHeight: a
}) => {
  const { styles: l } = rs();
  if (!s.isJSON)
    return /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a });
  const n = s.parsed, i = Dl(n), r = n.cache_read_tokens ?? 0, p = n.cache_write_tokens ?? 0, d = us(n.prompt_tokens, r), c = [
    { key: "prompt", label: t("trace.promptTokens", { defaultValue: "Prompt Tokens" }), value: n.prompt_tokens },
    { key: "completion", label: t("trace.completionTokens", { defaultValue: "Completion Tokens" }), value: n.completion_tokens },
    { key: "total", label: t("trace.totalTokens", { defaultValue: "Total Tokens" }), value: n.total_tokens },
    { key: "active", label: t("trace.activeTokens", { defaultValue: "Active Tokens" }), value: n.active_tokens }
  ];
  return /* @__PURE__ */ e.jsxs("div", { className: l.tokenPanel, style: { maxHeight: a }, children: [
    /* @__PURE__ */ e.jsx("div", { className: l.tokenGrid, children: c.map((m) => m.value !== void 0 ? /* @__PURE__ */ e.jsx("div", { className: l.tokenStat, children: /* @__PURE__ */ e.jsx(it, { title: m.label, value: m.value, groupSeparator: "," }) }, m.key) : null) }),
    i && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs("div", { className: l.tokenGrid, children: [
        /* @__PURE__ */ e.jsx("div", { className: l.tokenStat, children: /* @__PURE__ */ e.jsx(
          it,
          {
            title: t("trace.cacheReadTokens", { defaultValue: "Cache read" }),
            value: r,
            groupSeparator: ","
          }
        ) }),
        /* @__PURE__ */ e.jsx("div", { className: l.tokenStat, children: /* @__PURE__ */ e.jsx(
          it,
          {
            title: t("trace.cacheWriteTokens", { defaultValue: "Cache write" }),
            value: p,
            groupSeparator: ","
          }
        ) }),
        /* @__PURE__ */ e.jsx("div", { className: l.tokenStat, children: /* @__PURE__ */ e.jsx(
          it,
          {
            title: t("trace.cacheHitRate", { defaultValue: "Cache hit rate" }),
            value: d,
            precision: d % 1 === 0 ? 0 : 1,
            suffix: "%"
          }
        ) })
      ] }),
      /* @__PURE__ */ e.jsx(
        ks,
        {
          percent: d,
          showInfo: !1,
          size: "small",
          style: { marginTop: 8, marginBottom: 0 }
        }
      ),
      /* @__PURE__ */ e.jsx(xe, { type: "secondary", className: l.cacheHint, children: t("trace.cacheIncludedHint", {
        defaultValue: "Cache tokens are included in prompt tokens."
      }) })
    ] })
  ] });
}, $l = ({
  entry: s,
  t,
  maxHeight: a
}) => {
  const l = s.isJSON ? s.parsed : null, n = ke(
    () => l != null && l.arguments ? ds(l.arguments) : null,
    [l]
  );
  return l ? /* @__PURE__ */ e.jsxs("div", { children: [
    l.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(xe, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(xe, { code: !0, children: l.tool_call_id })
    ] }),
    l.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(xe, { strong: !0, children: [
        t("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(de, { color: "blue", children: l.tool })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(xe, { strong: !0, children: [
        t("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(we, { payload: n, maxHeight: a })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a });
}, Bl = ({
  entry: s,
  t,
  maxHeight: a
}) => {
  const l = s.isJSON ? s.parsed : null, n = ke(
    () => l != null && l.result ? ds(l.result) : null,
    [l]
  );
  if (!l)
    return /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a });
  const i = cs(l, !0);
  return /* @__PURE__ */ e.jsxs("div", { children: [
    l.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8, maxHeight: a, overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(xe, { strong: !0, children: [
        t("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(xe, { code: !0, children: l.tool_call_id })
    ] }),
    (typeof l.ok == "boolean" || i) && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(xe, { strong: !0, children: [
        t("trace.status", { defaultValue: "Status" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(de, { color: i ? "error" : "success", children: i ? t("trace.failed", { defaultValue: "Failed" }) : t("trace.succeeded", { defaultValue: "Succeeded" }) })
    ] }),
    n && /* @__PURE__ */ e.jsxs("div", { style: { overflow: "auto" }, children: [
      /* @__PURE__ */ e.jsxs(xe, { strong: !0, children: [
        t("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(we, { payload: n, maxHeight: a })
    ] })
  ] });
}, dt = { verticalAlign: "-2px" }, Hl = ({ entry: s, t, maxHeight: a }) => {
  const [l, n] = x("request"), { styles: i } = os({ isRaw: l === "raw" });
  return s.rawRequest ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      ct,
      {
        size: "small",
        value: l,
        onChange: (r) => n(r),
        options: [
          {
            value: "request",
            icon: /* @__PURE__ */ e.jsx(Ut, { style: dt }),
            title: t("trace.request", { defaultValue: "Request" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx($t, { style: dt }),
            title: t("trace.rawRequest", { defaultValue: "Raw Request" })
          }
        ]
      }
    ) }),
    l === "raw" ? /* @__PURE__ */ e.jsx(tt, { children: /* @__PURE__ */ e.jsx(we, { payload: s.rawRequest, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a });
}, Jl = ({ entry: s, t, maxHeight: a }) => {
  const [l, n] = x("response"), { styles: i } = os({ isRaw: l === "raw" });
  return s.rawResponse ? /* @__PURE__ */ e.jsxs("div", { className: i.rawToggleWrap, children: [
    /* @__PURE__ */ e.jsx("div", { className: i.rawToggleHeader, children: /* @__PURE__ */ e.jsx(
      ct,
      {
        size: "small",
        value: l,
        onChange: (r) => n(r),
        options: [
          {
            value: "response",
            icon: /* @__PURE__ */ e.jsx(Ut, { style: dt }),
            title: t("trace.response", { defaultValue: "Response" })
          },
          {
            value: "raw",
            icon: /* @__PURE__ */ e.jsx($t, { style: dt }),
            title: t("trace.rawResponse", { defaultValue: "Raw Response" })
          }
        ]
      }
    ) }),
    l === "raw" ? /* @__PURE__ */ e.jsx(tt, { children: /* @__PURE__ */ e.jsx(we, { payload: s.rawResponse, maxHeight: a }) }) : /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a })
  ] }) : /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a });
}, Nt = ({ entry: s, t, maxHeight: a }) => {
  const { event: l } = s;
  switch (l.event_type) {
    case "llm_request":
      return /* @__PURE__ */ e.jsx(Hl, { entry: s, t, maxHeight: a });
    case "llm_response":
      return /* @__PURE__ */ e.jsx(Jl, { entry: s, t, maxHeight: a });
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Ul, { entry: s, t, maxHeight: a });
    case "tool_call":
      return /* @__PURE__ */ e.jsx($l, { entry: s, t, maxHeight: a });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Bl, { entry: s, t, maxHeight: a });
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
          children: l.content
        }
      );
    default:
      return /* @__PURE__ */ e.jsx(we, { payload: s.display, maxHeight: a });
  }
};
function Dt(s) {
  return jt.indexOf(s);
}
function qt(s, t) {
  return s > 0 ? ` (${t("trace.durationMs", {
    ms: s,
    defaultValue: `${s}ms`
  })})` : "";
}
function Wl(s, t) {
  const a = /* @__PURE__ */ new Map();
  for (const n of s) {
    if (n.event.event_type !== "tool_call" || !n.isJSON) continue;
    const i = n.parsed;
    i.tool_call_id && i.tool && a.set(i.tool_call_id, i.tool);
  }
  const l = t("trace.failed", { defaultValue: "Failed" });
  return s.map((n, i) => {
    const { event: r } = n, p = t(`trace.eventTypes.${r.event_type}`, {
      defaultValue: r.event_type
    }), d = Ml[r.event_type] || "#8c8c8c";
    switch (r.event_type) {
      case "llm_request":
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: p,
          kind: "call",
          color: d
        };
      case "llm_response":
        return {
          id: r.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: `${p}${qt(r.duration_ms, t)}`,
          kind: "return",
          color: d
        };
      case "tool_call": {
        const c = n.isJSON ? n.parsed : null, m = (c == null ? void 0 : c.tool) || p;
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "tool",
          label: m,
          kind: "call",
          color: d
        };
      }
      case "tool_result": {
        const c = n.isJSON ? n.parsed : null, m = cs(c, n.isJSON), b = (c == null ? void 0 : c.tool_call_id) && a.get(c.tool_call_id) || "", y = b ? `${p}: ${b}` : p;
        return {
          id: r.id,
          entry: n,
          from: "tool",
          to: "agent",
          label: m ? `${y} · ${l}` : y,
          kind: "return",
          color: m ? ht : d,
          failed: m
        };
      }
      case "summary":
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "llm",
          label: p,
          kind: "call",
          color: d
        };
      case "token_usage": {
        const c = n.isJSON ? n.parsed : null, m = ql(c);
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: `${p}${m}`,
          kind: "note",
          color: d
        };
      }
      case "error": {
        const c = i > 0 ? s[i - 1].event : void 0, m = (c == null ? void 0 : c.event_type) === "llm_request", b = `${p}${qt(r.duration_ms, t)} · ${l}`;
        return m ? {
          id: r.id,
          entry: n,
          from: "llm",
          to: "agent",
          label: b,
          kind: "return",
          color: ht,
          failed: !0
        } : {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: b,
          kind: "note",
          color: ht,
          failed: !0
        };
      }
      default:
        return {
          id: r.id,
          entry: n,
          from: "agent",
          to: "agent",
          label: p,
          kind: "note",
          color: d
        };
    }
  });
}
const Kl = ({ from: s, to: t, label: a, color: l, kind: n, failed: i, styles: r, cx: p }) => {
  const d = Dt(s), c = Dt(t), m = (Math.min(d, c) + 0.5) * (100 / 3), b = (Math.max(d, c) + 0.5) * (100 / 3), y = b - m, O = c > d, I = n === "return";
  return /* @__PURE__ */ e.jsxs("div", { className: r.arrowTrack, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowLine,
        style: {
          left: `${m}%`,
          width: `${y}%`,
          borderTopColor: l,
          borderTopStyle: I ? "dashed" : "solid"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: r.arrowHead,
        style: O ? {
          left: `calc(${b}% - 2px)`,
          borderLeft: `8px solid ${l}`
        } : {
          left: `calc(${m}% - 6px)`,
          borderRight: `8px solid ${l}`
        }
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: p(r.arrowLabel, i && r.arrowLabelFailed),
        style: { color: l, borderColor: l },
        title: a,
        children: [
          i && /* @__PURE__ */ e.jsx(Xt, { className: r.failIcon }),
          /* @__PURE__ */ e.jsx("span", { children: a })
        ]
      }
    )
  ] });
}, Gl = ({ entries: s, t, selectedId: a, onSelect: l }) => {
  const { styles: n, cx: i } = rs(), r = ke(
    () => Wl(s, t),
    [s, t]
  ), p = (d) => t(`trace.actors.${d}`, {
    defaultValue: d === "agent" ? "Agent" : d === "llm" ? "LLM" : "Tool"
  });
  return r.length === 0 ? /* @__PURE__ */ e.jsx(
    We,
    {
      description: t("trace.noEvents", {
        defaultValue: "No trace events found for this trace ID"
      })
    }
  ) : /* @__PURE__ */ e.jsx("div", { className: n.sequenceWrap, children: /* @__PURE__ */ e.jsxs("div", { className: n.sequenceInner, children: [
    /* @__PURE__ */ e.jsx("div", { className: n.actorHeader, children: jt.map((d) => /* @__PURE__ */ e.jsx(
      "div",
      {
        className: n.actorBox,
        style: { borderColor: Rt[d], color: Rt[d] },
        children: p(d)
      },
      d
    )) }),
    /* @__PURE__ */ e.jsxs("div", { className: n.messageList, children: [
      /* @__PURE__ */ e.jsx("div", { className: n.lifelineBg, children: jt.map((d) => /* @__PURE__ */ e.jsx("div", { className: n.lifeline }, d)) }),
      r.map((d) => /* @__PURE__ */ e.jsxs(
        "div",
        {
          role: "button",
          tabIndex: 0,
          className: i(
            n.messageRow,
            a === d.id && n.messageRowActive
          ),
          onClick: () => l(d.entry),
          onKeyDown: (c) => {
            (c.key === "Enter" || c.key === " ") && (c.preventDefault(), l(d.entry));
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
                  d.failed && /* @__PURE__ */ e.jsx(Xt, { className: n.failIcon }),
                  /* @__PURE__ */ e.jsx("span", { children: d.label })
                ]
              }
            ) : /* @__PURE__ */ e.jsx(
              Kl,
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
}, Ql = () => {
  const { message: s, modal: t } = ge.useApp(), { t: a } = G("ai"), l = Fe(), [n, i] = as(), [r, p] = x(""), [d, c] = x(""), [m, b] = x("sequence"), [y, O] = x(
    null
  ), {
    data: I,
    loading: M,
    refresh: v
  } = A(() => k.ai.getAiTraceStatus(), {
    onError: () => {
      s.error(
        a("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), q = (I == null ? void 0 : I.enabled) ?? !1, { loading: w, run: U } = A(
    (j) => k.ai.toggleAiTrace({ enabled: j }),
    {
      manual: !0,
      onSuccess: (j, [F]) => {
        s.success(
          F ? a("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : a("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), v(), F || c("");
      },
      onError: () => {
        s.error(
          a("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: f,
    loading: W,
    run: Y
  } = A(
    (j) => k.ai.getAiTraceEvents({ trace_id: j }),
    {
      manual: !0,
      onError: () => {
        s.error(
          a("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), J = Ve(
    (j) => {
      c(j), O(null), Y(j);
    },
    [Y]
  ), le = _s(!1);
  ze(() => {
    var R, Z;
    if (le.current) return;
    le.current = !0;
    const j = (R = n.get("trace_id")) == null ? void 0 : R.trim();
    j && (p(j), J(j));
    const F = (Z = n.get("view")) == null ? void 0 : Z.trim();
    F && b(F);
  }, [n, J, b]);
  const Q = Ve(() => {
    const j = r.trim();
    j && (i(
      (F) => {
        const R = new URLSearchParams(F);
        return R.set("trace_id", j), R;
      },
      { replace: !0 }
    ), J(j));
  }, [r, J, i]), se = Ve(
    (j) => {
      const F = j ? a("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : a("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      t.confirm({
        title: j ? a("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : a("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: F,
        onOk: () => U(j)
      });
    },
    [a, U, t]
  ), T = Ve(async () => {
    if (d)
      try {
        const j = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!j.ok) throw new Error("download failed");
        const F = await j.blob(), R = window.URL.createObjectURL(F), Z = document.createElement("a");
        Z.href = R, Z.download = `ai-trace-${d}.json`, document.body.appendChild(Z), Z.click(), window.URL.revokeObjectURL(R), document.body.removeChild(Z);
      } catch {
        s.error(
          a("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, a]), P = ke(() => f ?? [], [f]), $ = ke(() => Nl(P), [P]);
  ze(() => {
    O(null);
  }, [d, m]);
  const N = ke(
    () => $.map((j) => {
      const { event: F } = j, R = Ot[F.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(ot, {})
      }, Z = a(`trace.eventTypes.${F.event_type}`, {
        defaultValue: F.event_type
      });
      return {
        key: F.id,
        dot: R.icon,
        color: R.color,
        children: /* @__PURE__ */ e.jsx(
          js,
          {
            size: "small",
            defaultActiveKey: [F.id],
            items: [
              {
                key: F.id,
                label: /* @__PURE__ */ e.jsxs(K, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(de, { color: R.color, children: Z }),
                  /* @__PURE__ */ e.jsxs(xe, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    F.step_order
                  ] }),
                  F.duration_ms > 0 && /* @__PURE__ */ e.jsxs(xe, { type: "secondary", style: { fontSize: 12 }, children: [
                    a("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    F.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(xe, { type: "secondary", style: { fontSize: 12 }, children: new Date(F.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(tt, { children: /* @__PURE__ */ e.jsx(Nt, { entry: j, t: a, maxHeight: 400 }) })
              }
            ]
          }
        )
      };
    }),
    [$, a]
  ), _ = y ? Ot[y.event.event_type] : null;
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
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(
              E,
              {
                icon: /* @__PURE__ */ e.jsx(kt, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: a("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Rl, { level: 4, style: { margin: 0 }, children: a("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(xe, { children: q ? a("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : a("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              ue,
              {
                checked: q,
                loading: M || w,
                onChange: se
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(K.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          placeholder: a("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: r,
          onChange: (j) => p(j.target.value),
          onPressEnter: Q,
          prefix: /* @__PURE__ */ e.jsx(Ls, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(E, { type: "primary", onClick: Q, loading: W, children: a("trace.search", { defaultValue: "Search" }) }),
      d && P.length > 0 && /* @__PURE__ */ e.jsx(E, { icon: /* @__PURE__ */ e.jsx(Os, {}), onClick: T, children: a("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    W ? /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ye, { size: "large" }) }) }) : d && P.length === 0 ? /* @__PURE__ */ e.jsx(ie, { children: /* @__PURE__ */ e.jsx(
      We,
      {
        description: a("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : P.length > 0 ? /* @__PURE__ */ e.jsx(
      ie,
      {
        title: /* @__PURE__ */ e.jsx(
          ct,
          {
            value: m,
            onChange: (j) => {
              b(j), i(
                (F) => {
                  const R = new URLSearchParams(F);
                  return R.set("view", j), R;
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
                icon: /* @__PURE__ */ e.jsx(Rs, {})
              },
              {
                label: a("trace.viewTimeline", {
                  defaultValue: "Timeline"
                }),
                value: "timeline",
                icon: /* @__PURE__ */ e.jsx(Gt, {})
              }
            ]
          }
        ),
        children: m === "sequence" ? /* @__PURE__ */ e.jsx(
          Gl,
          {
            entries: $,
            t: a,
            selectedId: y == null ? void 0 : y.event.id,
            onSelect: O
          }
        ) : /* @__PURE__ */ e.jsx(bs, { items: N })
      }
    ) : null,
    /* @__PURE__ */ e.jsx(
      Vs,
      {
        title: y ? /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(de, { color: (_ == null ? void 0 : _.color) || "default", children: a(`trace.eventTypes.${y.event.event_type}`, {
            defaultValue: y.event.event_type
          }) }),
          /* @__PURE__ */ e.jsxs(xe, { type: "secondary", children: [
            "#",
            y.event.step_order
          ] }),
          y.event.duration_ms > 0 && /* @__PURE__ */ e.jsxs(xe, { type: "secondary", children: [
            a("trace.duration", { defaultValue: "Duration" }),
            ":",
            " ",
            y.event.duration_ms,
            "ms"
          ] })
        ] }) : null,
        open: m === "sequence" && !!y,
        onClose: () => O(null),
        width: 800,
        styles: { body: { paddingRight: 0 } },
        children: y && /* @__PURE__ */ e.jsx(tt, { children: /* @__PURE__ */ e.jsx(Nt, { entry: y, t: a }) }, y.event.id)
      }
    )
  ] });
}, va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ql
}, Symbol.toStringTag, { value: "Module" })), { Text: He, Title: Zl } = Ye, Xl = Vt(
  () => Promise.all([
    import("@uiw/react-codemirror"),
    import("@codemirror/lang-json")
  ]).then(([{ default: s }, { json: t }]) => {
    const a = [t()];
    return { default: (n) => /* @__PURE__ */ e.jsx(s, { ...n, extensions: a }) };
  })
), Yl = ({
  content: s,
  maxHeight: t = 400
}) => {
  const { parsed: a, isJSON: l } = et(s);
  return l ? /* @__PURE__ */ e.jsx(
    rt,
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
}, ea = () => {
  var _;
  const { message: s } = ge.useApp(), { t } = G("system"), { t: a } = G("common"), l = Fe(), { id: n } = mt(), [i, r] = x(void 0), [p, d] = x("schema"), [c, m] = x({}), [b, y] = x("{}"), [O, I] = x(null), [M, v] = x(null), { loading: q, data: w } = A(
    () => k.system.getToolSet({ id: n }),
    {
      ready: !!n,
      onError: () => {
        s.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolset" }));
      }
    }
  ), { loading: U, data: f } = A(
    () => k.system.getToolSetTools({ id: n }),
    {
      ready: !!n,
      onError: () => {
        s.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" }));
      }
    }
  ), W = f == null ? void 0 : f.find(
    (j) => {
      var F;
      return ((F = j.function) == null ? void 0 : F.name) === i;
    }
  ), { loading: Y, run: J } = A(
    (j, F) => k.system.callTool({ id: n }, { name: j, parameters: F }),
    {
      manual: !0,
      onSuccess: (j) => {
        I((j == null ? void 0 : j.result) ?? "");
      },
      onError: (j) => {
        var R, Z;
        const F = ((Z = (R = j.response) == null ? void 0 : R.data) == null ? void 0 : Z.message) || j.message || t("settings.toolsets.callToolFailed", { defaultValue: "Tool call failed" });
        s.error(F), I(null);
      }
    }
  ), le = Ve((j) => {
    r(j), m({}), y("{}"), I(null), v(null);
  }, []), Q = Ve(() => {
    if (p === "schema")
      y(JSON.stringify(c, null, 2)), d("code");
    else {
      const { parsed: j, isJSON: F } = et(b);
      F && (m(j), v(null)), d("schema");
    }
  }, [p, c, b]), se = Ve((j) => {
    y(j);
    const { parsed: F, isJSON: R } = et(j);
    R ? (m(F), v(null)) : v(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
  }, [t]), T = Ve(() => {
    if (!i) {
      s.warning(t("settings.toolsets.selectToolFirst", { defaultValue: "Please select a tool first" }));
      return;
    }
    let j;
    if (p === "code") {
      if (M) {
        s.error(t("settings.toolsets.invalidJSON", { defaultValue: "Invalid JSON" }));
        return;
      }
      j = b;
    } else
      j = JSON.stringify(c);
    I(null), J(i, j);
  }, [i, p, c, b, M, J, t]), P = w, $ = (P == null ? void 0 : P.status) === "enabled" ? "green" : "red", N = (P == null ? void 0 : P.status) === "enabled" ? a("enabled", { defaultValue: "Enabled" }) : a("disabled", { defaultValue: "Disabled" });
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsx("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: /* @__PURE__ */ e.jsxs(K, { children: [
      /* @__PURE__ */ e.jsx(
        E,
        {
          icon: /* @__PURE__ */ e.jsx(kt, {}),
          onClick: () => l("/system/settings#ai-toolsets"),
          children: t("settings.toolsets.backToList", { defaultValue: "Back" })
        }
      ),
      /* @__PURE__ */ e.jsx(Zl, { level: 4, style: { margin: 0 }, children: t("settings.toolsets.debugTitle", { defaultValue: "Tool Debug" }) })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(ie, { style: { marginBottom: 16 }, loading: q, children: P && /* @__PURE__ */ e.jsxs(he, { column: 2, size: "small", children: [
      /* @__PURE__ */ e.jsx(he.Item, { label: t("settings.toolsets.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(He, { strong: !0, children: P.name }) }),
      /* @__PURE__ */ e.jsx(he.Item, { label: t("settings.toolsets.type", { defaultValue: "Type" }), children: /* @__PURE__ */ e.jsx(de, { color: "blue", children: String(P.type).toUpperCase() }) }),
      /* @__PURE__ */ e.jsx(he.Item, { label: t("settings.toolsets.description", { defaultValue: "Description" }), span: 2, children: P.description || "-" }),
      /* @__PURE__ */ e.jsx(he.Item, { label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(de, { color: $, children: N }) })
    ] }) }),
    /* @__PURE__ */ e.jsxs(ie, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(He, { strong: !0, children: t("settings.toolsets.selectTool", { defaultValue: "Select Tool" }) }) }),
        U ? /* @__PURE__ */ e.jsx(ye, { size: "small" }) : /* @__PURE__ */ e.jsx(
          H,
          {
            style: { width: "100%" },
            placeholder: t("settings.toolsets.selectToolPlaceholder", { defaultValue: "Select a tool to debug" }),
            value: i,
            onChange: le,
            optionLabelProp: "label",
            children: (f ?? []).map((j) => {
              var B, ne;
              const F = ((B = j.function) == null ? void 0 : B.name) ?? "", R = ((ne = j.function) == null ? void 0 : ne.description) ?? "", Z = R ? `${F} - ${R}` : F;
              return /* @__PURE__ */ e.jsx(H.Option, { value: F, label: Z, children: /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: Z,
                  children: Z
                }
              ) }, F);
            })
          }
        )
      ] }),
      W && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
          /* @__PURE__ */ e.jsx(He, { strong: !0, children: t("settings.toolsets.parameters", { defaultValue: "Parameters" }) }),
          /* @__PURE__ */ e.jsx(
            ut,
            {
              title: p === "schema" ? t("settings.toolsets.switchToCodeEditor", { defaultValue: "Switch to JSON editor" }) : t("settings.toolsets.switchToFormEditor", { defaultValue: "Switch to form editor" }),
              children: /* @__PURE__ */ e.jsx(
                E,
                {
                  size: "small",
                  icon: p === "schema" ? /* @__PURE__ */ e.jsx(es, {}) : /* @__PURE__ */ e.jsx(Yt, {}),
                  onClick: Q
                }
              )
            }
          )
        ] }),
        p === "schema" ? (_ = W.function) != null && _.parameters ? /* @__PURE__ */ e.jsx(
          Bs,
          {
            schema: W.function.parameters,
            value: c,
            onChange: m
          }
        ) : /* @__PURE__ */ e.jsx(He, { type: "secondary", children: t("settings.toolsets.noParameters", { defaultValue: "This tool has no parameters" }) }) : /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx(
            bt,
            {
              fallback: /* @__PURE__ */ e.jsx("div", { style: { height: 200, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ e.jsx(ye, {}) }),
              children: /* @__PURE__ */ e.jsx(
                Xl,
                {
                  value: b,
                  height: "200px",
                  onChange: se,
                  basicSetup: { lineNumbers: !0, foldGutter: !0 }
                }
              )
            }
          ),
          M && /* @__PURE__ */ e.jsx(He, { type: "danger", style: { fontSize: 12, marginTop: 4, display: "block" }, children: M })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { marginBottom: O !== null ? 16 : 0 }, children: /* @__PURE__ */ e.jsx(
        E,
        {
          type: "primary",
          icon: /* @__PURE__ */ e.jsx(Us, {}),
          loading: Y,
          disabled: !i,
          onClick: T,
          children: t("settings.toolsets.callTool", { defaultValue: "Run" })
        }
      ) }),
      O !== null && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: /* @__PURE__ */ e.jsx(He, { strong: !0, children: t("settings.toolsets.result", { defaultValue: "Result" }) }) }),
        /* @__PURE__ */ e.jsx(Yl, { content: O, maxHeight: 300 })
      ] })
    ] })
  ] });
}, _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ea
}, Symbol.toStringTag, { value: "Module" })), ta = () => {
  const { t: s } = G("system"), [t] = as(), a = t.get("provider"), l = t.get("code"), n = t.get("state"), [i, r] = x(null), [p, d] = x(null), [c, m] = x(null);
  return A(async () => {
    if (!l || !n || !a)
      throw new Error(s("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const b = await k.system.testOauthCallback({ code: l, state: n, provider: a });
    if (!b.user_info)
      throw new Error(s("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!b.user)
      throw new Error(s("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    r(b.user), d(b.user_info);
  }, {
    onSuccess: () => {
      m({
        status: "success",
        message: s("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (b) => {
      m({
        status: "error",
        message: s("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: b.message
      });
    }
  }), c ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    vs,
    {
      status: c.status,
      title: c.message,
      subTitle: c.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !p || !i ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(ie, { title: s("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(rt, { value: p || {} }) }),
        /* @__PURE__ */ e.jsx(ie, { title: s("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(rt, { value: i || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(vt, {});
}, Sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ta
}, Symbol.toStringTag, { value: "Module" }));
export {
  va as A,
  ba as O,
  Va as S,
  _a as T,
  ka as a,
  Sa as b,
  ja as i
};
