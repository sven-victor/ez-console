import { j as e } from "./vendor.js";
import { Form as a, message as r, Spin as ue, Switch as le, Select as H, Input as k, Alert as He, Divider as $e, Space as G, Button as F, InputNumber as ne, Modal as Q, Skeleton as dt, Descriptions as te, Steps as ut, Tag as se, Table as Ce, Radio as Oe, Tabs as Xe, Tooltip as ct, Card as X, Row as De, Col as _e, Checkbox as Le, Empty as Ee, AutoComplete as We, Upload as mt, Tree as gt, Menu as ft, Collapse as pt, Typography as ht, Timeline as xt, Result as yt } from "antd";
import { useTranslation as K } from "react-i18next";
import { useState as S, useEffect as Fe, useMemo as ve, useCallback as Ve } from "react";
import { useRequest as C } from "ahooks";
import { SaveOutlined as ze, ReloadOutlined as ce, LoadingOutlined as jt, CheckCircleTwoTone as bt, StarFilled as Vt, CheckCircleOutlined as Ye, StarOutlined as kt, EditOutlined as Te, DeleteOutlined as ke, BugOutlined as St, PlusOutlined as Ie, ThunderboltOutlined as _t, ToolOutlined as qe, SettingOutlined as vt, LockOutlined as wt, FileTextOutlined as Me, EyeOutlined as et, UploadOutlined as Ke, CalendarOutlined as Ct, ArrowLeftOutlined as tt, FolderOutlined as st, FileOutlined as lt, FileAddOutlined as Ft, FolderAddOutlined as Tt, SearchOutlined as It, DownloadOutlined as At, WarningOutlined as Et, DashboardOutlined as zt, MessageOutlined as Pt, SendOutlined as Ot } from "@ant-design/icons";
import { a as w } from "./index.js";
import { g as Je, a as Mt, s as Rt } from "./base.js";
import { f as oe, e as Lt, b as Pe, J as Ut, j as Nt, M as at, L as Dt } from "./components.js";
import Ue from "react-quill";
import { useNavigate as pe, useLocation as qt, useParams as Be, useSearchParams as $t } from "react-router-dom";
import { c as it, b as Bt } from "./contexts.js";
import { l as Ht, c as Wt, u as Kt, d as Jt, g as Gt, b as Zt, e as Qt, f as Xt, r as Yt } from "./system.js";
import { l as es, b as ts } from "./authorization.js";
import { createStyles as ss } from "antd-style";
import Ge from "react-json-view";
const Se = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, ls = {
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
}, as = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = K("system"), { t: i } = K("common"), [d] = a.useForm(), [n, h] = S((t == null ? void 0 : t.provider) || "custom"), [g, x] = S((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, f] = S((t == null ? void 0 : t.enabled) || !1), [m, E] = S((t == null ? void 0 : t.auto_create_user) || !1), { loading: z, data: R, refresh: v } = C(w.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (_) => {
      d.setFieldsValue(_), h(_.provider), x(_.provider === "custom" || _.provider === "autoDiscover"), f(_.enabled), E(_.auto_create_user);
    },
    onError: (_) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", _);
    }
  });
  Fe(() => {
    t && (d.setFieldsValue(t), h(t.provider), x(t.provider === "custom" || t.provider === "autoDiscover"), f(t.enabled), E(t.auto_create_user));
  }, [t, d]);
  const T = (_) => {
    h(_), x(_ === "custom" || _ === "autoDiscover");
    const b = ls[_];
    b && d.setFieldsValue({
      auth_endpoint: b.endpoints.auth_endpoint,
      token_endpoint: b.endpoints.token_endpoint,
      userinfo_endpoint: b.endpoints.userinfo_endpoint,
      scope: b.scope,
      // Set field mappings
      email_field: b.email_field,
      username_field: b.username_field,
      full_name_field: b.full_name_field,
      avatar_field: b.avatar_field,
      role_field: b.role_field,
      // Set display configuration
      icon_url: b.icon_url,
      display_name: b.display_name
    });
  }, $ = (_) => {
    f(_);
  }, P = (_) => {
    E(_);
  }, { loading: I, run: A } = C(w.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : v();
    },
    onError: (_) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", _);
    }
  }), M = (_) => {
    A(_);
  }, D = () => {
    l ? l() : v();
  }, { loading: U, run: ee } = C(async ({ redirect_uri: _, ...b }) => {
    let W;
    return _ ? W = new URL(_) : W = new URL(window.location.origin), W.pathname = Je("/system/settings/oauth/test-callback"), W.searchParams.set("provider", n), w.system.testOauthConnection({ redirect_uri: W.toString(), ...b });
  }, {
    manual: !0,
    onSuccess: ({ url: _ }) => {
      window.open(_, "_blank");
    },
    onError: (_) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: _.message })), console.error("Failed to test OAuth connection", _);
    }
  }), O = () => n === "custom";
  return /* @__PURE__ */ e.jsx(ue, { spinning: z, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: M,
      initialValues: t || R,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(le, { onChange: $ })
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
            children: /* @__PURE__ */ e.jsxs(H, { onChange: T, disabled: !o, children: [
              /* @__PURE__ */ e.jsx(H.Option, { value: "github", children: s("settings.oauth.provider.options.github", { defaultValue: "GitHub" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "google", children: s("settings.oauth.provider.options.google", { defaultValue: "Google" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "dingtalk", children: s("settings.oauth.provider.options.dingtalk", { defaultValue: "DingTalk" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "wechat", children: s("settings.oauth.provider.options.wechat", { defaultValue: "WeChat" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "autoDiscover", children: s("settings.oauth.provider.options.autoDiscover", { defaultValue: "Auto Discover" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "custom", children: s("settings.oauth.provider.options.custom", { defaultValue: "Custom" }) })
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
                pattern: Se,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o, placeholder: "https://example.com/icon.png" })
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o })
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
            children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !o, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        O() && /* @__PURE__ */ e.jsx(
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
                pattern: Se,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o })
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
                pattern: Se,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && n === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o })
          }
        ),
        O() && /* @__PURE__ */ e.jsx(
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
                pattern: Se,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o })
          }
        ),
        O() && /* @__PURE__ */ e.jsx(
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
                pattern: Se,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o })
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
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(_) => _.getFieldValue("redirect_uri") !== "" ? {
              pattern: Se,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o, placeholder: `http://${window.location.host}${Je(`/login?provider=settings.${n}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(le, { onChange: P, disabled: !o })
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
                required: o && m,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(k, { disabled: !o || !m })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "auto",
            children: /* @__PURE__ */ e.jsxs(H, { disabled: !o, children: [
              /* @__PURE__ */ e.jsx(H.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "auto", children: s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }) }),
              /* @__PURE__ */ e.jsx(H.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          He,
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
                  s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }),
                  ":"
                ] }),
                " ",
                s("settings.oauth.roleMappingMode.options.auto.description", { defaultValue: "Uses OAuth2 roles for new users or users without roles, but preserves existing role assignments." })
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
            children: /* @__PURE__ */ e.jsx(le, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx($e, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          He,
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
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "email", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "login", autoComplete: "off", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "name", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "avatar_url", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(k, { placeholder: "role", disabled: !o || !g })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: I,
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              loading: U,
              onClick: async () => {
                const _ = d.getFieldsValue();
                ee(_);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: D,
              icon: /* @__PURE__ */ e.jsx(ce, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, is = () => {
  const { t } = K("system"), { t: l } = K("common"), [s] = a.useForm(), { loading: i, data: d, refresh: n } = C(w.system.getSecuritySettings, {
    onSuccess: (o) => {
      s.setFieldsValue(o);
    },
    onError: (o) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: h, run: g } = C(w.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: (o) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), x = (o) => {
    g(o);
  };
  return /* @__PURE__ */ e.jsx(ue, { spinning: i, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: s,
      layout: "vertical",
      onFinish: x,
      initialValues: d,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
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
          a.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(ne, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(ne, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(le, {})
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
                children: /* @__PURE__ */ e.jsx(ne, { min: 1, max: 10, style: { width: "100%" } })
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
                children: /* @__PURE__ */ e.jsx(ne, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(le, {})
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
                children: /* @__PURE__ */ e.jsx(ne, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(ne, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ne, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ne, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: h,
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: () => n(),
              icon: /* @__PURE__ */ e.jsx(ce, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ns = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = K("system"), [n, h] = S([]), [g, x] = S([]), { run: o, loading: f } = C(t, {
    onError: (z) => {
      r.error(d("settings.ldap.importError", { error: `${z.message}` }));
    },
    onSuccess: (z) => {
      h(z);
    },
    manual: !0
  }), { run: m, loading: E } = C(async () => {
    for (const z of g.filter((R) => {
      const v = n.find((T) => T.ldap_dn === R);
      return !(!v || v.status === "imported");
    })) {
      const R = await l([z]);
      h((v) => [...v].map(($) => {
        for (const P of R)
          if ($.ldap_dn === P.ldap_dn)
            return { ...P, status: "imported" };
        return $;
      }));
    }
  }, {
    manual: !0
  });
  return Fe(() => {
    i.visible && (h([]), o(), x([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    Q,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        m();
      },
      width: 900,
      confirmLoading: E,
      loading: f,
      children: /* @__PURE__ */ e.jsx(
        Ce,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (z) => {
              x(z);
            },
            getCheckboxProps: (z) => ({
              disabled: z.status === "imported"
            })
          },
          columns: s.map(({ render: z, ...R }) => z ? {
            ...R,
            render: (v, T, $) => {
              const P = g.includes(T.ldap_dn) && E && T.status !== "imported";
              return z(v, T, $, P);
            }
          } : R),
          dataSource: n,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, os = () => {
  var T, $, P;
  const { t } = K("system"), [l] = a.useForm(), [s, i] = S(!1), [d, n] = S(null), [h, g] = S(!1), [x, o] = S(!1), [f] = a.useForm(), [m, E] = S(!1);
  C(w.system.getLdapSettings, {
    onSuccess: (I) => {
      l.setFieldsValue(I), E(I.enabled);
    },
    onError: (I) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${I.message}` }));
    }
  }), Fe(() => {
    n(null);
  }, [h]);
  const z = async (I) => {
    i(!0);
    try {
      await w.system.updateLdapSettings(I), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: R, loading: v } = C(async (I) => {
    const A = await l.validateFields();
    return await w.system.testLdapConnection({
      ...I,
      ...A
    });
  }, {
    onSuccess: (I) => {
      n(I);
    },
    onError: (I) => {
      r.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${I.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      a,
      {
        form: l,
        layout: "vertical",
        onFinish: z,
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
              children: /* @__PURE__ */ e.jsx(le, { onChange: (I) => E(I) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: m, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: m, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: m, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(k.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: m, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: m, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: m, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: m, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: m, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(k, { type: "number", defaultValue: 15, disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx($e, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(k.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(oe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(oe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              F,
              {
                disabled: !m,
                style: { marginLeft: 8 },
                onClick: () => g(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(oe, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              F,
              {
                disabled: !m,
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
      Q,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: h,
        onCancel: () => g(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: f,
              layout: "vertical",
              onFinish: R,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(k, { disabled: !m })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !m })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(oe, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(F, { disabled: !m, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
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
          /* @__PURE__ */ e.jsx(ue, { spinning: v, children: /* @__PURE__ */ e.jsx(dt, { active: v, loading: v, children: d && (d.user ? /* @__PURE__ */ e.jsxs(te, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(te.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(te.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            ut,
            {
              direction: "vertical",
              current: (T = d.message) == null ? void 0 : T.findIndex((I) => !I.success),
              status: ($ = d.message) != null && $.find((I) => !I.success) ? "error" : "finish",
              items: (P = d.message) == null ? void 0 : P.map((I) => ({
                status: I.success ? "finish" : "error",
                title: I.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      ns,
      {
        visible: x,
        onCancel: () => o(!1),
        fetchItems: () => w.system.importLdapUsers({}),
        importItems: (I) => w.system.importLdapUsers({ user_dn: I }),
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
          render: (I, A, M, D) => D ? /* @__PURE__ */ e.jsx(ue, { indicator: /* @__PURE__ */ e.jsx(jt, { spin: !0 }) }) : I ? /* @__PURE__ */ e.jsx(bt, { twoToneColor: "#52c41a" }) : A.id ? /* @__PURE__ */ e.jsx(se, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(se, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, rs = () => {
  const { t } = K("system"), { t: l } = K("common"), [s] = a.useForm(), [i, d] = S(null), [n, h] = S(!1), [g] = a.useForm(), [x, o] = S(!1), { loading: f } = C(w.system.getSmtpSettings, {
    onSuccess: (v) => {
      s.setFieldsValue(v), o(v.enabled);
    },
    onError: (v) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${v.message}` }));
    }
  });
  Fe(() => {
    d(null);
  }, [n]);
  const { run: m, loading: E } = C(({ port: v, ...T }) => w.system.updateSmtpSettings({ ...T, port: Number(v) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (v) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${v.message}` }));
    }
  }), { run: z, loading: R } = C(async (v) => {
    const { port: T, ...$ } = await s.validateFields();
    return await w.system.testSmtpConnection({
      ...v,
      ...$,
      port: Number(T)
    });
  }, {
    onSuccess: (v) => {
      d(v);
    },
    onError: (v) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${v.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ue, { spinning: f, children: /* @__PURE__ */ e.jsxs(
      a,
      {
        form: s,
        layout: "vertical",
        onFinish: m,
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
              children: /* @__PURE__ */ e.jsx(le, { onChange: (v) => o(v) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: x, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !x, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: x, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { type: "number", disabled: !x, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: x, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !x, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(k.Password, { disabled: !x, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: x, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Oe.Group, { disabled: !x, children: [
                /* @__PURE__ */ e.jsx(Oe.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Oe.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Oe.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: x, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(k, { disabled: !x, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(k, { disabled: !x, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx($e, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Ue, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Ue, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Ue, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(oe, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: E, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              F,
              {
                onClick: () => h(!0),
                disabled: !x || R,
                loading: R,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: n,
        onCancel: () => h(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => h(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(F, { type: "primary", loading: R, onClick: () => g.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: g,
            layout: "vertical",
            onFinish: (v) => z(v),
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
}, ds = () => {
  const { t, i18n: l } = K("system"), { t: s } = K("common"), [i] = a.useForm(), { loading: d, data: n, refresh: h } = C(w.system.getSystemBaseSettings, {
    onSuccess: (f) => {
      i.setFieldsValue(f);
    },
    onError: (f) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", f);
    }
  }), { loading: g, run: x } = C(w.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: (f) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", f);
    }
  }), o = (f) => {
    x(f);
  };
  return /* @__PURE__ */ e.jsx(ue, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: o,
      initialValues: n,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Xe, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(k, {}) }) })
        }, ...Lt.map((f) => ({
          key: f.lang,
          label: l.language !== f.lang ? s(`language.${f.lang}`, { defaultValue: f.label, lang: f.label }) : f.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", f.lang], children: /* @__PURE__ */ e.jsx(k, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(k, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(k, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(le, {})
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
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              type: "primary",
              htmlType: "submit",
              loading: g,
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            F,
            {
              onClick: () => h(),
              icon: /* @__PURE__ */ e.jsx(ce, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: us } = k, cs = () => {
  const { t } = K("ai"), { t: l } = K("common"), s = pe(), [i] = a.useForm(), [d, n] = S(!1), [h, g] = S(null), [x, o] = S(""), [f, m] = S(""), { loading: E, data: z } = C(
    () => w.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (j) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", j);
      }
    }
  ), R = ve(() => z == null ? void 0 : z.find((j) => j.provider === f), [z, f]), { loading: v, data: T, refresh: $ } = C(
    () => w.ai.listAiModels({ current: 1, page_size: 100, search: x }),
    {
      refreshDeps: [x],
      onError: (j) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", j);
      }
    }
  ), { loading: P, run: I } = C(
    ({ config: j, ...B }) => w.ai.createAiModel({ config: j ?? {}, ...B }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), n(!1), i.resetFields(), $();
      },
      onError: (j) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", j);
      }
    }
  ), { loading: A, run: M } = C(
    ({ id: j, data: B }) => w.ai.updateAiModel({ id: j }, B),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), n(!1), i.resetFields(), g(null), $();
      },
      onError: (j) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", j);
      }
    }
  ), { runAsync: D } = C(
    (j) => w.ai.deleteAiModel({ id: j }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), $();
      },
      onError: (j) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", j);
      }
    }
  ), { runAsync: U } = C(
    (j) => w.ai.testAiModel({ id: j }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (j) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", j);
      }
    }
  ), { runAsync: ee } = C(
    (j) => w.ai.setDefaultAiModel({ id: j }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), $();
      },
      onError: (j) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", j);
      }
    }
  ), O = () => {
    g(null), m(""), i.resetFields(), n(!0);
  }, _ = (j) => {
    g(j), m(j.provider);
    const B = j.config || {}, ie = {
      name: j.name,
      description: j.description,
      provider: j.provider,
      is_default: j.is_default,
      config: B,
      // Spread config fields to form
      status: j.status
    };
    i.setFieldsValue(ie), n(!0);
  }, b = (j) => {
    m(j), i.setFieldValue("config", void 0);
  }, W = (j) => {
    let B = j.config ?? {};
    const ie = {
      name: j.name,
      description: j.description,
      provider: j.provider,
      config: B,
      is_default: j.is_default,
      status: j.status
    };
    h ? M({ id: h.id, data: ie }) : I(ie);
  }, Y = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (j, B) => /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx("span", { children: j }),
        B.is_default && /* @__PURE__ */ e.jsx(ct, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Vt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (j) => /* @__PURE__ */ e.jsx(se, { color: "blue", children: j.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (j) => /* @__PURE__ */ e.jsx(se, { color: j === "enabled" ? "green" : "red", children: j === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (j, B) => /* @__PURE__ */ e.jsx(Pe, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Ye, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => U(B.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(kt, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => ee(B.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Te, {}),
          tooltip: l("edit", { defaultValue: "Edit" }),
          onClick: async () => _(B)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => D(B.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(X, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsx(
        k.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: x,
          onChange: (j) => o(j.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(oe, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          F,
          {
            icon: /* @__PURE__ */ e.jsx(St, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          F,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ce, {}),
            onClick: $,
            loading: v,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(oe, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          F,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: O,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx(
      Ce,
      {
        columns: Y,
        dataSource: (T == null ? void 0 : T.data) || [],
        loading: v,
        rowKey: "id",
        pagination: {
          total: (T == null ? void 0 : T.total) || 0,
          current: (T == null ? void 0 : T.current) || 1,
          pageSize: (T == null ? void 0 : T.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (j, B) => l("pagination.total", {
            defaultValue: `${B[0]}-${B[1]} of ${j} items`,
            start: B[0],
            end: B[1],
            total: j
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: h ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          n(!1), i.resetFields(), g(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: W,
            children: [
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
                    us,
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
                    H,
                    {
                      loading: E,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: b,
                      value: f,
                      options: z == null ? void 0 : z.map((j) => ({
                        label: j.name,
                        value: j.provider
                      }))
                    }
                  )
                }
              ),
              R && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(
                Ut,
                {
                  schema: R.config_schema
                }
              ) }),
              /* @__PURE__ */ e.jsxs(
                a.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(le, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: P || A,
                    children: h ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    onClick: () => {
                      n(!1), i.resetFields(), g(null), m("");
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
}, { TextArea: ms } = k, gs = () => {
  var Z;
  const { t } = K("system"), { t: l } = K("common"), [s] = a.useForm(), [i, d] = S(!1), [n, h] = S(null), [g, x] = S(""), [o, f] = S(!1), [m, E] = S(null), [z, R] = S(""), [v, T] = S(!1), [$, P] = S([]), [I, A] = S(), { loading: M, data: D, refresh: U } = C(
    () => w.system.listToolSets({ current: 1, page_size: 100, search: g, type: I }),
    {
      refreshDeps: [g, I],
      onError: (u) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", u);
      }
    }
  ), { loading: ee, data: O } = C(
    () => w.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (u) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", u);
      }
    }
  ), _ = ve(() => O == null ? void 0 : O.find((u) => u.tool_set_type === z), [O, z]), { loading: b, run: W } = C(
    (u) => w.system.createToolSet({
      ...u,
      type: u.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), d(!1), s.resetFields(), U();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", u);
      }
    }
  ), { loading: Y, run: j } = C(
    ({ id: u, data: q }) => w.system.updateToolSet({ id: u }, {
      ...q,
      type: q.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), s.resetFields(), h(null), U();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", u);
      }
    }
  ), { run: B } = C(
    (u) => w.system.deleteToolSet({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), U();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", u);
      }
    }
  ), { runAsync: ie } = C(
    (u) => w.system.testToolSet({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (u) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", u);
      }
    }
  ), { loading: ae, runAsync: me } = C(
    (u) => w.system.getToolSetTools({ id: u }),
    {
      manual: !0,
      onSuccess: (u) => {
        P(u || []), T(!0);
      },
      onError: (u) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", u);
      }
    }
  ), { runAsync: he } = C(
    ({ id: u, status: q }) => w.system.updateToolSetStatus({ id: u }, { status: q }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), U();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", u);
      }
    }
  ), ye = () => {
    h(null), s.resetFields(), R(""), d(!0);
  }, re = (u) => {
    h(u), R(u.type);
    const q = { ...u };
    s.setFieldsValue(q), d(!0);
  }, je = (u) => {
    R(u), s.setFieldValue("config", {});
  }, be = (u) => {
    n ? j({ id: n.id, data: u }) : W(u);
  }, ge = (u) => {
    B(u);
  }, de = (u) => {
    E(u), f(!0);
  }, xe = (u) => {
    const q = u.status === "enabled" ? "disabled" : "enabled";
    return he({ id: u.id, status: q });
  }, V = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (u) => /* @__PURE__ */ e.jsx(se, { color: "blue", children: u.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (u) => /* @__PURE__ */ e.jsx(se, { color: u === "enabled" ? "green" : "red", children: u === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (u, q) => /* @__PURE__ */ e.jsx(Pe, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(_t, {}),
          disabled: q.status !== "enabled",
          onClick: async () => ie(q.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(qe, {}),
          permission: "system:toolsets:view",
          disabled: q.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => me(q.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(vt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => de(q.config),
          disabled: !q.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Te, {}),
          onClick: async () => re(q)
        },
        {
          key: "toggleStatus",
          icon: q.status === "enabled" ? /* @__PURE__ */ e.jsx(wt, {}) : /* @__PURE__ */ e.jsx(Ye, {}),
          onClick: async () => xe(q),
          permission: "system:toolsets:update",
          tooltip: q.status === "enabled" ? l("disable", { defaultValue: "Disable" }) : l("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(ke, {}),
          permission: "system:toolsets:delete",
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => ge(q.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => ge(q.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(X, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(De, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          k.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            value: g,
            onChange: (u) => x(u.target.value),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          H,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: I,
            onChange: (u) => A(u),
            options: O == null ? void 0 : O.map((u) => ({
              label: u.name,
              value: u.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(H.Option, { value: "", children: "All" }),
              O == null ? void 0 : O.map((u) => /* @__PURE__ */ e.jsx(H.Option, { value: u.tool_set_type, children: u.name }, u.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(_e, { children: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          F,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ce, {}),
            onClick: U,
            loading: M,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(oe, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          F,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Ie, {}),
            onClick: ye,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx(
      Ce,
      {
        columns: V,
        dataSource: (D == null ? void 0 : D.data) || [],
        loading: M,
        rowKey: "id",
        pagination: {
          total: (D == null ? void 0 : D.total) || 0,
          current: (D == null ? void 0 : D.current) || 1,
          pageSize: (D == null ? void 0 : D.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (u, q) => l("pagination.total", {
            defaultValue: `${q[0]}-${q[1]} of ${u} items`,
            start: q[0],
            end: q[1],
            total: u
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: n ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          d(!1), s.resetFields(), h(null), R("");
        },
        footer: null,
        width: ((Z = _ == null ? void 0 : _.ui_schema) == null ? void 0 : Z["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: be,
            children: [
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
                    ms,
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
                    H,
                    {
                      loading: ee,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: je,
                      value: z,
                      options: O == null ? void 0 : O.map((u) => ({
                        label: u.name,
                        value: u.tool_set_type
                      }))
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                Nt,
                {
                  name: "config",
                  schema: _ == null ? void 0 : _.config_schema,
                  uiSchema: _ == null ? void 0 : _.ui_schema
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: b || Y,
                    children: n ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  F,
                  {
                    onClick: () => {
                      d(!1), s.resetFields(), h(null), R("");
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
      Q,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => f(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => f(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(m, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: v,
        onCancel: () => T(!1),
        footer: [
          /* @__PURE__ */ e.jsx(F, { onClick: () => T(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: ae ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ce, { style: { fontSize: 24 }, spin: !0 }) }) : $.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : $.map((u, q) => {
          var p, c, y;
          return /* @__PURE__ */ e.jsx(
            X,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(G, { children: [
                /* @__PURE__ */ e.jsx(qe, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((p = u.function) == null ? void 0 : p.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(De, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(_e, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((c = u.function) == null ? void 0 : c.description) || "-" })
                ] }),
                ((y = u.function) == null ? void 0 : y.parameters) && /* @__PURE__ */ e.jsxs(_e, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(u.function.parameters, null, 2) })
                ] })
              ] })
            },
            q
          );
        }) })
      }
    )
  ] });
}, { TextArea: Ze } = k;
function fs(t, l) {
  const s = {}, i = [], d = new Map(l.map((n) => [n.id, n]));
  for (const n of t) {
    if (n.toolset_id === "*") {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const h = d.get(n.toolset_id);
    if (!h) {
      i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
      continue;
    }
    const g = (h.tools || []).map((x) => x.name);
    if (n.tool_name === "*") {
      s[n.toolset_id] = [...g];
      continue;
    }
    g.includes(n.tool_name) ? (s[n.toolset_id] || (s[n.toolset_id] = []), s[n.toolset_id].includes(n.tool_name) || s[n.toolset_id].push(n.tool_name)) : i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
  }
  return { selections: s, extraPatterns: i };
}
function ps(t, l) {
  const s = [], i = /* @__PURE__ */ new Set();
  for (const [d, n] of Object.entries(t))
    for (const h of n) {
      const g = `${d}|${h}`;
      i.has(g) || (i.add(g), s.push({ toolset_id: d, tool_name: h }));
    }
  for (const d of l) {
    const n = d.toolset_id.trim(), h = d.tool_name.trim();
    if (!n || !h)
      continue;
    const g = `${n}|${h}`;
    i.has(g) || (i.add(g), s.push({ toolset_id: n, tool_name: h }));
  }
  return s;
}
function nt(t, l) {
  const s = l.trim();
  return !s || t.some((i) => i.value === s) ? t : [...t, { value: s, label: s }];
}
function hs(t, l, s, i) {
  const n = [{ value: "*", label: i }], h = /* @__PURE__ */ new Set(["*"]), g = (x, o) => {
    h.has(x) || (h.add(x), n.push({
      value: x,
      label: o ? `${x} — ${o}` : x
    }));
  };
  if (l && l !== "*") {
    const x = t.find((o) => o.id === l);
    for (const o of (x == null ? void 0 : x.tools) || [])
      g(o.name, o.description);
  } else
    for (const x of t)
      for (const o of x.tools || [])
        g(o.name, o.description);
  return nt(n, s);
}
const xs = () => {
  const { t } = K("system"), { t: l } = K("common"), s = pe(), { enableSkillToolBinding: i } = it(), [d] = a.useForm(), [n, h] = S(""), [g, x] = S(), [o, f] = S(!1), [m, E] = S(null), [z, R] = S(!1), [v] = a.useForm(), [T, $] = S(!1), [P, I] = S([]), [A, M] = S({}), [D, U] = S([]), [ee, O] = S(!1), _ = ve(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...P.map((p) => ({
      value: p.id,
      label: `${p.name} (${p.id})`
    }))
  ], [P, t]), b = Ve(() => {
    I([]), M({}), U([]);
  }, []), { loading: W, data: Y, refresh: j } = C(
    () => w.system.listSkills({
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
  ), { data: B = [] } = C(() => w.system.listSkillDomains()), ie = (Y == null ? void 0 : Y.data) ?? [], ae = (Y == null ? void 0 : Y.total) ?? 0, { run: me } = C(
    (p) => w.system.deleteSkill({ id: p }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), j();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), { loading: he, run: ye } = C(
    (p) => w.system.uploadSkill(p.body, p.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), R(!1), v.resetFields(), j();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), re = Ve(
    async (p) => {
      O(!0);
      try {
        const [c, y] = await Promise.all([
          w.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          w.system.listSkillAiToolBindings(
            { id: p, current: 1, page_size: 1e3 }
          )
        ]), N = (c.data || []).filter((rt) => rt.status === "enabled");
        I(N);
        const L = y.data || [], { selections: J, extraPatterns: Ae } = fs(L, N);
        M(J), U(Ae);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), b();
      } finally {
        O(!1);
      }
    },
    [b, t]
  );
  Fe(() => {
    !o || !m || !i || re(m.id);
  }, [o, m == null ? void 0 : m.id, i, re]);
  const je = (p, c) => {
    M((y) => ({ ...y, [p]: c }));
  }, be = (p, c, y) => {
    M((N) => ({
      ...N,
      [p]: y ? [...c] : []
    }));
  }, ge = () => {
    E(null), d.resetFields(), b(), f(!0);
  }, de = (p) => {
    E(p), d.setFieldsValue({
      name: p.name,
      description: p.description,
      category: p.category,
      domain: p.domain
    }), b(), f(!0);
  }, xe = () => {
    d.validateFields().then(async (p) => {
      $(!0);
      try {
        if (m) {
          const c = {
            name: p.name,
            description: p.description ?? "",
            category: p.category ?? "",
            domain: p.domain ?? ""
          };
          if (await w.system.updateSkill({ id: m.id }, c), i) {
            const y = ps(A, D);
            await w.system.replaceSkillAiToolBindings(
              { id: m.id },
              { bindings: y }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else {
          const c = {
            name: p.name,
            description: p.description ?? "",
            category: p.category ?? "",
            domain: p.domain ?? "",
            content: p.content ?? ""
          };
          await w.system.createSkill(c), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        f(!1), E(null), d.resetFields(), b(), j();
      } catch {
        r.error(
          m ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        $(!1);
      }
    });
  }, V = () => {
    var L, J;
    const p = (L = v.getFieldValue("file")) == null ? void 0 : L.fileList, c = ((J = p == null ? void 0 : p[0]) == null ? void 0 : J.originFileObj) ?? (p == null ? void 0 : p[0]);
    if (!c) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const y = v.getFieldValue("category"), N = v.getFieldValue("domain");
    ye({ body: { category: y, domain: N }, file: c });
  }, Z = i && m, u = Z ? 720 : 560, q = [
    { title: t("settings.skills.name", { defaultValue: "Name" }), dataIndex: "name", key: "name" },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (p) => p ? /* @__PURE__ */ e.jsx(se, { children: p }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (p) => p ? /* @__PURE__ */ e.jsx(se, { color: "blue", children: p }) : "-" },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 150,
      render: (p, c) => /* @__PURE__ */ e.jsx(
        Pe,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(Me, {}),
              onClick: async () => s(`/system/settings/skills/${c.id}/edit`),
              permission: "system:skills:edit_files"
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(et, {}),
              onClick: async () => s(`/system/settings/skills/${c.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Te, {}),
              onClick: async () => de(c),
              permission: "system:skills:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              danger: !0,
              confirm: {
                title: l("confirmDelete", { defaultValue: "Confirm delete?" }),
                onConfirm: async () => me(c.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    X,
    {
      title: t("settings.skills.title", { defaultValue: "AI Agent Skills" }),
      extra: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(
          k.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: h,
            style: { width: 200 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          H,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: g,
            onChange: x,
            options: B.map((p) => ({ value: p, label: p }))
          }
        ),
        /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(ce, {}), onClick: () => j(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(oe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ie, {}), onClick: ge, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(oe, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Ke, {}), onClick: () => R(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsx(
          Ce,
          {
            rowKey: "id",
            loading: W,
            columns: q,
            dataSource: ie,
            pagination: { total: ae, pageSize: 10, showSizeChanger: !0 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          Q,
          {
            title: m ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
            open: o,
            onOk: xe,
            onCancel: () => {
              f(!1), E(null), b();
            },
            confirmLoading: T,
            width: u,
            children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(k, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(Ze, { rows: 2 }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(H, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: B.map((p) => ({ value: p, label: p })) }) }),
              !m && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(Ze, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
              Z && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(ue, { spinning: ee, children: P.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
                /* @__PURE__ */ e.jsx(G, { direction: "vertical", size: "middle", style: {
                  width: "100%",
                  overflow: "auto",
                  maxHeight: "calc(100vh - 800px)",
                  minHeight: "calc(300px)"
                }, children: P.map((p) => {
                  const c = (p.tools || []).map((J) => J.name), y = A[p.id] || [], N = c.length > 0 && y.length === c.length, L = y.length > 0 && y.length < c.length;
                  return /* @__PURE__ */ e.jsx(
                    X,
                    {
                      size: "small",
                      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                        /* @__PURE__ */ e.jsx(
                          Le,
                          {
                            checked: N,
                            indeterminate: L,
                            onChange: (J) => be(p.id, c, J.target.checked)
                          }
                        ),
                        /* @__PURE__ */ e.jsx("span", { children: p.name })
                      ] }),
                      extra: p.description ? /* @__PURE__ */ e.jsx("span", { children: p.description }) : void 0,
                      children: (p.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(Le.Group, { style: { width: "100%" }, value: y, onChange: (J) => je(p.id, J), children: /* @__PURE__ */ e.jsx(G, { direction: "vertical", style: { width: "100%" }, children: (p.tools || []).map((J) => /* @__PURE__ */ e.jsx(Le, { value: J.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                        /* @__PURE__ */ e.jsx("div", { children: J.name }),
                        J.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: J.description })
                      ] }) }, J.name)) }) }) : /* @__PURE__ */ e.jsx(
                        Ee,
                        {
                          image: Ee.PRESENTED_IMAGE_SIMPLE,
                          description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                        }
                      )
                    },
                    p.id
                  );
                }) }),
                /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                  /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                  /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                    defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                  }) }),
                  /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, children: [
                    D.map((p, c) => /* @__PURE__ */ e.jsxs(
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
                            We,
                            {
                              allowClear: !0,
                              style: { flex: 1, minWidth: 0 },
                              placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                              value: p.toolset_id,
                              options: nt(_, p.toolset_id),
                              filterOption: (y, N) => {
                                const L = N;
                                return `${(L == null ? void 0 : L.value) ?? ""} ${(L == null ? void 0 : L.label) ?? ""}`.toLowerCase().includes(y.toLowerCase());
                              },
                              onChange: (y) => {
                                const N = typeof y == "string" ? y : "";
                                U(
                                  (L) => L.map((J, Ae) => Ae === c ? { ...J, toolset_id: N } : J)
                                );
                              }
                            }
                          ),
                          /* @__PURE__ */ e.jsx(
                            We,
                            {
                              allowClear: !0,
                              style: { flex: 1, minWidth: 0 },
                              placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                              value: p.tool_name,
                              options: hs(
                                P,
                                p.toolset_id,
                                p.tool_name,
                                t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                              ),
                              filterOption: (y, N) => {
                                const L = N;
                                return `${(L == null ? void 0 : L.value) ?? ""} ${(L == null ? void 0 : L.label) ?? ""}`.toLowerCase().includes(y.toLowerCase());
                              },
                              onChange: (y) => {
                                const N = typeof y == "string" ? y : "";
                                U(
                                  (L) => L.map((J, Ae) => Ae === c ? { ...J, tool_name: N } : J)
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
                              onClick: () => U((y) => y.filter((N, L) => L !== c)),
                              children: l("delete", { defaultValue: "Delete" })
                            }
                          )
                        ]
                      },
                      c
                    )),
                    /* @__PURE__ */ e.jsx(F, { type: "dashed", onClick: () => U((p) => [...p, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
                  ] })
                ] })
              ] }) : /* @__PURE__ */ e.jsx(
                Ee,
                {
                  image: Ee.PRESENTED_IMAGE_SIMPLE,
                  description: t("settings.skills.aiToolsetsEmpty", { defaultValue: "No AI toolsets available for this organization." })
                }
              ) }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          Q,
          {
            title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
            open: z,
            onOk: V,
            onCancel: () => R(!1),
            confirmLoading: he,
            children: /* @__PURE__ */ e.jsxs(a, { form: v, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(mt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Ke, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(k, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(H, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: B.map((p) => ({ value: p, label: p })) }) })
            ] })
          }
        )
      ]
    }
  );
}, ys = () => {
  const t = pe(), { t: l } = K("system"), { t: s } = K("task"), { t: i } = K("common"), [d] = a.useForm(), { data: n } = C(w.system.listLogStorageBackends), h = (n ?? []).map((E) => ({
    value: E.id,
    label: l(`settings.task.logStorage.${E.id}`, { defaultValue: E.name })
  })), { loading: g, refresh: x } = C(w.system.getTaskSettings, {
    onSuccess: (E) => {
      E && d.setFieldsValue({
        max_concurrent: E.max_concurrent,
        log_storage_backend: E.log_storage_backend ?? "database",
        ai_chat_retention_days: E.ai_chat_retention_days ?? 90,
        log_retention_days: E.log_retention_days ?? 30,
        audit_log_retention_days: E.audit_log_retention_days ?? 365
      });
    },
    onError: () => {
      r.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: o, run: f } = C(w.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), m = (E) => {
    f(E);
  };
  return /* @__PURE__ */ e.jsx(ue, { spinning: g, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: m,
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
              H,
              {
                options: h,
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
            children: /* @__PURE__ */ e.jsx(ne, { min: 1, max: 100, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(ne, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
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
            children: /* @__PURE__ */ e.jsx(ne, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
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
            children: /* @__PURE__ */ e.jsx(ne, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(F, { type: "primary", htmlType: "submit", loading: o, icon: /* @__PURE__ */ e.jsx(ze, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(F, { onClick: () => x(), icon: /* @__PURE__ */ e.jsx(ce, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(oe, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(Ct, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: js } = k, bs = () => {
  const t = pe(), { t: l } = K("system"), { t: s } = K("common"), [i] = a.useForm(), [d, n] = S(!1), [h, g] = S(null), [x, o] = S(""), [f, m] = S(1), [E, z] = S(10), { loading: R, data: v, refresh: T } = C(
    () => Ht({ current: f, page_size: E, search: x }),
    {
      refreshDeps: [f, E, x],
      onError: (b) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", b);
      }
    }
  ), { loading: $, run: P } = C(
    (b) => Wt(b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), n(!1), i.resetFields(), g(null), T();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: I, run: A } = C(
    ({ id: b, ...W }) => Kt({ id: b }, W),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), n(!1), i.resetFields(), g(null), T();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: M } = C(
    (b) => Jt({ id: b }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), T();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), D = () => {
    g(null), i.resetFields(), i.setFieldsValue({ status: "active" }), n(!0);
  }, U = (b) => {
    g(b), i.setFieldsValue({
      name: b.name,
      description: b.description,
      status: b.status
    }), n(!0);
  }, ee = (b) => {
    Q.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${b.name}"? This action cannot be undone.`
      }),
      onOk: () => M(b.id)
    });
  }, O = () => {
    i.validateFields().then((b) => {
      h ? A({ id: h.id, ...b }) : P(b);
    });
  }, _ = [
    {
      title: l("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
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
      render: (b) => /* @__PURE__ */ e.jsx(se, { color: b === "active" ? "green" : "default", children: b === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (b, W) => /* @__PURE__ */ e.jsx(
        Pe,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(et, {}),
              onClick: async () => t(`/system/settings/organizations/${W.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Te, {}),
              onClick: async () => U(W),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              danger: !0,
              onClick: async () => ee(W),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    X,
    {
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(G, { children: [
        /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(ce, {}), onClick: T, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(oe, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ie, {}), onClick: D, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            k.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (b) => {
                o(b), m(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Ce,
            {
              columns: _,
              dataSource: (v == null ? void 0 : v.data) || [],
              loading: R,
              rowKey: "id",
              pagination: {
                current: f,
                pageSize: E,
                total: (v == null ? void 0 : v.total) || 0,
                showSizeChanger: !0,
                showTotal: (b, W) => s("pagination.total", {
                  defaultValue: `${W[0]}-${W[1]} of ${b} items`,
                  start: W[0],
                  end: W[1],
                  total: b
                }),
                onChange: (b, W) => {
                  m(b), z(W);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          Q,
          {
            title: h ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: d,
            onOk: O,
            onCancel: () => {
              n(!1), i.resetFields(), g(null);
            },
            confirmLoading: $ || I,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: i, layout: "vertical", children: [
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
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(js, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
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
      ]
    }
  );
}, Vs = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = K("system"), s = pe(), i = qt(), h = i.hash.replace("#", "") || "base", { enableMultiOrg: g } = it(), { hasPermission: x } = Bt(), o = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(ds, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(is, {}),
      hidden: !x("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(as, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(os, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(rs, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(cs, {}),
      hidden: !x("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(gs, {}),
      hidden: !x("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(xs, {}),
      hidden: !x("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(ys, {}),
      hidden: !x("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...g ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(bs, {}),
      hidden: !x("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(X, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Xe,
    {
      defaultActiveKey: h,
      onChange: (f) => {
        s(`${i.pathname}#${f}`);
      },
      items: t(o.filter((f) => !f.hidden), l)
    }
  ) });
}, Qs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vs
}, Symbol.toStringTag, { value: "Module" })), ks = () => {
  var ge, de, xe;
  const t = pe(), { id: l } = Be(), { t: s } = K("system"), { t: i } = K("common"), [d] = a.useForm(), [n] = a.useForm(), [h, g] = S(!1), [x, o] = S(!1), [f, m] = S(null), [E, z] = S(""), [R, v] = S(1), [T, $] = S(10), { data: P, loading: I, refresh: A } = C(
    () => Gt({ id: l }),
    {
      ready: !!l,
      onError: (V) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", V);
      }
    }
  ), { data: M, loading: D, refresh: U } = C(
    () => Zt({ id: l, current: R, page_size: T, search: E }),
    {
      ready: !!l,
      refreshDeps: [l, R, T, E],
      onError: (V) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", V);
      }
    }
  ), { data: ee, loading: O } = C(
    () => es({ current: 1, page_size: 1e3 }),
    {
      ready: h
    }
  ), { data: _, loading: b } = C(
    () => ts({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: W, run: Y } = C(
    (V) => Qt({ id: l }, V),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), g(!1), d.resetFields(), U();
      },
      onError: (V) => {
        r.error((V == null ? void 0 : V.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: j, run: B } = C(
    (V) => Xt({ id: l, user_id: f == null ? void 0 : f.id }, V),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), n.resetFields(), m(null), U();
      },
      onError: (V) => {
        r.error((V == null ? void 0 : V.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: ie } = C(
    (V) => Yt({ id: l, user_id: V }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), U();
      },
      onError: (V) => {
        r.error((V == null ? void 0 : V.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), ae = () => {
    g(!0), d.resetFields();
  }, me = (V) => {
    var Z;
    m(V), n.setFieldsValue({
      role_ids: ((Z = V.organization_roles) == null ? void 0 : Z.map((u) => u.id)) || []
    }), o(!0);
  }, he = (V) => {
    Q.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${V.full_name || V.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => ie(V.id)
    });
  }, ye = () => {
    d.validateFields().then((V) => {
      Y(V);
    });
  }, re = () => {
    n.validateFields().then((V) => {
      B(V);
    });
  }, je = ((ge = ee == null ? void 0 : ee.data) == null ? void 0 : ge.filter((V) => {
    var Z;
    return !((Z = M == null ? void 0 : M.data) != null && Z.some((u) => u.id === V.id));
  })) || [], be = [
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
      render: (V) => /* @__PURE__ */ e.jsx(se, { color: V === "active" ? "green" : "default", children: V === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : V })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (V, Z) => {
        var u;
        return /* @__PURE__ */ e.jsx(G, { wrap: !0, children: ((u = Z.organization_roles) == null ? void 0 : u.map((q) => /* @__PURE__ */ e.jsx(se, { children: q.name }, q.id))) || /* @__PURE__ */ e.jsx(se, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (V, Z) => /* @__PURE__ */ e.jsx(
        Pe,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Te, {}),
              onClick: async () => me(Z)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(ke, {}),
              danger: !0,
              onClick: async () => he(Z)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      X,
      {
        title: /* @__PURE__ */ e.jsxs(G, { children: [
          /* @__PURE__ */ e.jsx(
            F,
            {
              icon: /* @__PURE__ */ e.jsx(tt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            P == null ? void 0 : P.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(ce, {}), onClick: () => {
          A(), U();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: I,
        children: /* @__PURE__ */ e.jsxs(te, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(te.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: P == null ? void 0 : P.name }),
          /* @__PURE__ */ e.jsx(te.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(se, { color: (P == null ? void 0 : P.status) === "active" ? "green" : "default", children: (P == null ? void 0 : P.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(te.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (P == null ? void 0 : P.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      X,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ie, {}), onClick: ae, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(G, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            k.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (V) => {
                z(V), v(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Ce,
            {
              columns: be,
              dataSource: (M == null ? void 0 : M.data) || [],
              loading: D,
              rowKey: "id",
              pagination: {
                current: R,
                pageSize: T,
                total: (M == null ? void 0 : M.total) || 0,
                showSizeChanger: !0,
                showTotal: (V) => i("pagination.total", { defaultValue: `Total ${V} items` }),
                onChange: (V, Z) => {
                  v(V), $(Z);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: h,
        onOk: ye,
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
                H,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: O,
                  filterOption: (V, Z) => ((Z == null ? void 0 : Z.label) ?? "").toLowerCase().includes(V.toLowerCase()),
                  options: je.map((V) => ({
                    label: `${V.full_name || V.username} (${V.email})`,
                    value: V.id
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
                H,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: b,
                  options: ((de = _ == null ? void 0 : _.data) == null ? void 0 : de.map((V) => ({
                    label: V.name,
                    value: V.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Q,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: x,
        onOk: re,
        onCancel: () => {
          o(!1), n.resetFields(), m(null);
        },
        confirmLoading: j,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: n, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                k,
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
                H,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: b,
                  options: ((xe = _ == null ? void 0 : _.data) == null ? void 0 : xe.map((V) => ({
                    label: V.name,
                    value: V.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, Xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ks
}, Symbol.toStringTag, { value: "Module" })), Ss = ss(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: Qe } = k, _s = (t) => t.toLowerCase().endsWith(".md");
function ot(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(st, {}) : /* @__PURE__ */ e.jsx(lt, {}),
      children: (s = l.children) != null && s.length ? ot(l.children) : void 0
    };
  });
}
function Ne(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const vs = () => {
  const { styles: t } = Ss(), { id: l } = Be(), s = pe(), { t: i } = K("system"), [d, n] = S(null), [h, g] = S(null), [x, o] = S(!1), [f, m] = S(""), [E, z] = S(!1), [R, v] = S([]), [T, $] = S(!1), [P, I] = S(!1), [A, M] = S(""), [D] = a.useForm(), [U, ee] = S(null), [O, _] = S(null), [b, W] = S(""), [Y] = a.useForm(), { data: j } = C(
    () => l ? w.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: B, loading: ie, refresh: ae } = C(
    () => l ? w.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (c) => {
        if (!d) {
          for (const y of c)
            if (!y.is_dir && y.name === "SKILL.md") {
              g(y.path), n(y.path), o(!1);
              return;
            }
          for (const y of c)
            if (!y.is_dir && y.name === "SKILLS.md") {
              g(y.path), n(y.path), o(!1);
              return;
            }
        }
      }
    }
  ), me = (j == null ? void 0 : j.data) ?? j, he = (B == null ? void 0 : B.data) ?? B ?? [], ye = ve(() => ot(he), [he]), re = x && h ? h : d ? Ne(d) : "";
  Fe(() => {
    d && l ? (w.system.getSkillFile({ id: l, path: d }).then((c) => m((c == null ? void 0 : c.data) ?? c ?? "")).catch(() => r.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), z(!1)) : (m(""), z(!1));
  }, [l, d, i]);
  const je = () => {
    !l || !d || w.system.putSkillFile({ id: l, path: d }, f).then(() => {
      r.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), z(!1);
    }).catch(() => r.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, be = (c, y) => {
    const N = String(y.node.key), L = !y.node.isLeaf;
    g(N), o(L), y.node.isLeaf ? n(N) : n(null);
  }, ge = (c) => {
    c.event.preventDefault(), ee({
      path: String(c.node.key),
      isDir: !c.node.isLeaf,
      x: c.event.clientX,
      y: c.event.clientY
    });
  }, de = Ve(() => ee(null), []), xe = Ve(
    (c) => {
      if (!l || !U) return;
      const { path: y, isDir: N } = U;
      switch (de(), c) {
        case "open":
          n(y), g(y), o(!1);
          break;
        case "rename": {
          const L = y.includes("/") ? y.split("/").pop() : y;
          _({ path: y, isDir: N }), W(L), setTimeout(() => Y.setFieldsValue({ name: L }), 0);
          break;
        }
        case "delete":
          Q.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: N ? i("settings.skills.editor.deleteConfirmContentDir", { path: y, defaultValue: `Delete ${y}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: y, defaultValue: `Delete ${y}?` }),
            onOk: () => w.system.deleteSkillPath({ id: l, path: y }).then(() => {
              r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === y && (n(null), m("")), h === y && (g(null), o(!1)), ae();
            }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          g(y), o(N), $(!0);
          break;
        case "newDir":
          g(y), o(N), I(!0);
          break;
      }
    },
    [l, U, de, ae, d, h, Y, i]
  ), V = () => {
    if (!l || !O) return;
    const c = (Y.getFieldValue("name") ?? b).trim();
    if (!c) {
      r.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!O.isDir && !/\.(md|txt)$/i.test(c)) {
      r.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const y = Ne(O.path), N = y ? `${y}/${c}` : c;
    if (N === O.path) {
      _(null);
      return;
    }
    w.system.moveSkillPath({ id: l }, { from_path: O.path, to_path: N }).then(() => {
      r.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === O.path && n(N), h === O.path && g(N), _(null), ae();
    }).catch(() => r.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, Z = (c) => {
    if (!l) return;
    const y = String(c.dragNode.key), N = String(c.dragNode.title);
    let L;
    if (c.dropToGap) {
      const J = Ne(String(c.node.key));
      L = J ? `${J}/${N}` : N;
    } else
      L = `${c.node.key}/${N}`;
    L !== y && w.system.moveSkillPath({ id: l }, { from_path: y, to_path: L }).then(() => {
      r.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === y && n(L), h === y && g(L), ae();
    }).catch(() => r.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, u = () => {
    const c = A.trim();
    if (!c || !l) return;
    const y = re ? `${re}/${c}` : c;
    if (!/\.(md|txt)$/i.test(c)) {
      r.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    w.system.putSkillFile({ id: l, path: y }, "").then(() => {
      r.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), $(!1), M(""), ae(), n(y), m("");
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, q = () => {
    var N;
    const c = (N = D.getFieldValue("name")) == null ? void 0 : N.trim();
    if (!c || !l) return;
    const y = re ? `${re}/${c}` : c;
    w.system.createSkillDir({ id: l }, { path: y }).then(() => {
      r.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), I(!1), D.resetFields(), ae();
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, p = () => {
    const c = h || d;
    !l || !c || Q.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: c, defaultValue: `Delete ${c}?` }),
      onOk: () => w.system.deleteSkillPath({ id: l, path: c }).then(() => {
        r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === c && (n(null), m("")), h === c && (g(null), o(!1)), ae();
      }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    X,
    {
      title: (me == null ? void 0 : me.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(F, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(G, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(F, { size: "small", icon: /* @__PURE__ */ e.jsx(Ie, {}), onClick: () => $(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(F, { size: "small", icon: /* @__PURE__ */ e.jsx(st, {}), onClick: () => I(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            ie ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              gt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !0,
                expandedKeys: R,
                onExpand: (c) => v(c),
                selectedKeys: h ? [h] : [],
                onSelect: be,
                onRightClick: ge,
                onDrop: Z,
                className: t.fileTree,
                treeData: ye
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(G, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(F, { type: "primary", icon: /* @__PURE__ */ e.jsx(ze, {}), disabled: !E, onClick: je, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(F, { danger: !0, icon: /* @__PURE__ */ e.jsx(ke, {}), onClick: p, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              _s(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  Qe,
                  {
                    value: f,
                    onChange: (c) => {
                      m(c.target.value), z(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(at, { content: Mt(f) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                Qe,
                {
                  value: f,
                  onChange: (c) => {
                    m(c.target.value), z(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        U && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: de,
              onContextMenu: (c) => c.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: U.x, top: U.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            ft,
            {
              selectable: !1,
              items: [
                ...U.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(lt, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Te, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(ke, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(Ft, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Tt, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: c }) => xe(c)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(Q, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: T, onOk: u, onCancel: () => {
          $(!1), M("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(k, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: A, onChange: (c) => M(c.target.value) }) }),
        /* @__PURE__ */ e.jsx(Q, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: P, onOk: () => D.validateFields().then(q), onCancel: () => I(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: D, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(k, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          Q,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!O,
            onOk: V,
            onCancel: () => _(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: Y, layout: "vertical", onValuesChange: (c, y) => W(y.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: O != null && O.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              k,
              {
                placeholder: O != null && O.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => V()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vs
}, Symbol.toStringTag, { value: "Module" })), ws = () => {
  var m;
  const { id: t } = Be(), l = pe(), { t: s } = K("system"), { data: i, loading: d } = C(
    () => t ? w.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: n, loading: h } = C(
    () => t ? w.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t, onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })) }
  ), g = (i == null ? void 0 : i.data) ?? i, x = ((m = n == null ? void 0 : n.data) == null ? void 0 : m.content) ?? (n == null ? void 0 : n.content) ?? "", o = Rt(x);
  if (!t) return null;
  const f = d || h;
  return /* @__PURE__ */ e.jsx(
    X,
    {
      title: (g == null ? void 0 : g.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(F, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      children: /* @__PURE__ */ e.jsx(ue, { spinning: f, children: /* @__PURE__ */ e.jsx("div", { style: { minHeight: 200 }, children: !f && /* @__PURE__ */ e.jsx(at, { content: o }) }) })
    }
  );
}, el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ws
}, Symbol.toStringTag, { value: "Module" })), { Text: fe, Title: Cs } = ht, Fs = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(Ot, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Pt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(zt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(qe, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(Me, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Et, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(Me, {}) }
};
function Re(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const we = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: i } = Re(t);
  return i ? /* @__PURE__ */ e.jsx(
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
      children: JSON.stringify(s, null, 2)
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
}, Ts = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Re(t);
  return i ? /* @__PURE__ */ e.jsxs(te, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      te.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      te.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      te.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      te.Item,
      {
        label: l("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(we, { content: t });
}, Is = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Re(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(fe, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(se, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(fe, { strong: !0, children: [
        l("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(we, { content: s.arguments, maxHeight: 200 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(we, { content: t });
}, As = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Re(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(fe, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(fe, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(fe, { strong: !0, children: [
        l("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(we, { content: s.result, maxHeight: 300 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(we, { content: t });
}, Es = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Ts, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(Is, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(As, { content: t.content, t: l });
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
      return /* @__PURE__ */ e.jsx(we, { content: t.content });
  }
}, zs = () => {
  const { t } = K("ai"), l = pe(), [s, i] = S(""), [d, n] = S(""), {
    data: h,
    loading: g,
    refresh: x
  } = C(() => w.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), o = (h == null ? void 0 : h.enabled) ?? !1, { loading: f, run: m } = C(
    (A) => w.ai.toggleAiTrace({ enabled: A }),
    {
      manual: !0,
      onSuccess: (A, [M]) => {
        r.success(
          M ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), x(), M || n("");
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
    data: E,
    loading: z,
    run: R
  } = C(
    (A) => w.ai.getAiTraceEvents({ trace_id: A }),
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
  ), v = Ve(() => {
    s.trim() && (n(s.trim()), R(s.trim()));
  }, [s, R]), T = Ve(
    (A) => {
      const M = A ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      Q.confirm({
        title: A ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: M,
        onOk: () => m(A)
      });
    },
    [t, m]
  ), $ = Ve(async () => {
    if (d)
      try {
        const A = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!A.ok) throw new Error("download failed");
        const M = await A.blob(), D = window.URL.createObjectURL(M), U = document.createElement("a");
        U.href = D, U.download = `ai-trace-${d}.json`, document.body.appendChild(U), U.click(), window.URL.revokeObjectURL(D), document.body.removeChild(U);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), P = ve(() => E ?? [], [E]), I = ve(
    () => P.map((A) => {
      const M = Fs[A.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(Me, {})
      }, D = t(
        `trace.eventTypes.${A.event_type}`,
        { defaultValue: A.event_type }
      );
      return {
        key: A.id,
        dot: M.icon,
        color: M.color,
        children: /* @__PURE__ */ e.jsx(
          pt,
          {
            size: "small",
            defaultActiveKey: [A.id],
            items: [
              {
                key: A.id,
                label: /* @__PURE__ */ e.jsxs(G, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(se, { color: M.color, children: D }),
                  /* @__PURE__ */ e.jsxs(fe, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    A.step_order
                  ] }),
                  A.duration_ms > 0 && /* @__PURE__ */ e.jsxs(fe, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    A.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(fe, { type: "secondary", style: { fontSize: 12 }, children: new Date(A.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Es, { event: A, t })
              }
            ]
          }
        )
      };
    }),
    [P, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(X, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
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
              F,
              {
                icon: /* @__PURE__ */ e.jsx(tt, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Cs, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(G, { children: [
            /* @__PURE__ */ e.jsx(fe, { children: o ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              le,
              {
                checked: o,
                loading: g || f,
                onChange: T
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(X, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(G.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        k,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (A) => i(A.target.value),
          onPressEnter: v,
          prefix: /* @__PURE__ */ e.jsx(It, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(F, { type: "primary", onClick: v, loading: z, children: t("trace.search", { defaultValue: "Search" }) }),
      d && P.length > 0 && /* @__PURE__ */ e.jsx(F, { icon: /* @__PURE__ */ e.jsx(At, {}), onClick: $, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    z ? /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ue, { size: "large" }) }) }) : d && P.length === 0 ? /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx(
      Ee,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : P.length > 0 ? /* @__PURE__ */ e.jsx(X, { children: /* @__PURE__ */ e.jsx(xt, { items: I }) }) : null
  ] });
}, tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zs
}, Symbol.toStringTag, { value: "Module" })), Ps = () => {
  const { t } = K("system"), [l] = $t(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [n, h] = S(null), [g, x] = S(null), [o, f] = S(null);
  return C(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const m = await w.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!m.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!m.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    h(m.user), x(m.user_info);
  }, {
    onSuccess: () => {
      f({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (m) => {
      f({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: m.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    yt,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(G, { style: { display: !g || !n ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(X, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Ge, { src: g || {} }) }),
        /* @__PURE__ */ e.jsx(X, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Ge, { src: n || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Dt, {});
}, sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ps
}, Symbol.toStringTag, { value: "Module" }));
export {
  tl as A,
  Xs as O,
  Ys as S,
  el as a,
  sl as b,
  Qs as i
};
