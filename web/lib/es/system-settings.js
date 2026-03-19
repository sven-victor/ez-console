import { j as e } from "./vendor.js";
import { Form as a, message as o, Spin as ce, Switch as te, Select as q, Input as h, Alert as qe, Divider as Ue, Space as K, Button as I, InputNumber as ie, Modal as W, Skeleton as st, Descriptions as Y, Steps as lt, Tag as ee, Table as Se, Radio as Ee, Tabs as We, Tooltip as at, Card as Z, Row as Re, Col as Ve, Upload as it, Tree as nt, Menu as ot, Collapse as rt, Typography as dt, Empty as ut, Timeline as ct, Result as mt } from "antd";
import { useTranslation as H } from "react-i18next";
import { useState as V, useEffect as Ce, useMemo as Fe, useCallback as we } from "react";
import { useRequest as S } from "ahooks";
import { SaveOutlined as Ie, ReloadOutlined as de, LoadingOutlined as gt, CheckCircleTwoTone as ft, StarFilled as pt, CheckCircleOutlined as Ge, StarOutlined as ht, EditOutlined as ve, DeleteOutlined as ye, BugOutlined as xt, PlusOutlined as _e, ThunderboltOutlined as yt, ToolOutlined as Le, SettingOutlined as jt, LockOutlined as bt, FileTextOutlined as ze, EyeOutlined as Ze, UploadOutlined as $e, CalendarOutlined as Vt, ArrowLeftOutlined as Qe, FolderOutlined as Xe, FileOutlined as Ye, FileAddOutlined as kt, FolderAddOutlined as St, SearchOutlined as vt, DownloadOutlined as _t, WarningOutlined as wt, DashboardOutlined as Ft, MessageOutlined as Ct, SendOutlined as It } from "@ant-design/icons";
import { a as _ } from "./index.js";
import { g as Be, a as Tt, s as At } from "./base.js";
import { f as ne, e as Et, b as Te, J as zt, j as Ot, M as et, L as Mt } from "./components.js";
import Me from "react-quill";
import { useNavigate as me, useLocation as Pt, useParams as De, useSearchParams as Rt } from "react-router-dom";
import { l as Lt, c as Ut, u as Dt, d as Nt, g as qt, b as $t, e as Bt, f as Ht, r as Kt } from "./system.js";
import { c as Jt, b as Wt } from "./contexts.js";
import { l as Gt, b as Zt } from "./authorization.js";
import { createStyles as Qt } from "antd-style";
import He from "react-json-view";
const be = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Xt = {
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
}, Yt = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = H("system"), { t: i } = H("common"), [d] = a.useForm(), [u, x] = V((t == null ? void 0 : t.provider) || "custom"), [p, j] = V((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [n, c] = V((t == null ? void 0 : t.enabled) || !1), [m, z] = V((t == null ? void 0 : t.auto_create_user) || !1), { loading: T, data: M, refresh: w } = S(_.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (b) => {
      d.setFieldsValue(b), x(b.provider), j(b.provider === "custom" || b.provider === "autoDiscover"), c(b.enabled), z(b.auto_create_user);
    },
    onError: (b) => {
      o.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", b);
    }
  });
  Ce(() => {
    t && (d.setFieldsValue(t), x(t.provider), j(t.provider === "custom" || t.provider === "autoDiscover"), c(t.enabled), z(t.auto_create_user));
  }, [t, d]);
  const F = (b) => {
    x(b), j(b === "custom" || b === "autoDiscover");
    const f = Xt[b];
    f && d.setFieldsValue({
      auth_endpoint: f.endpoints.auth_endpoint,
      token_endpoint: f.endpoints.token_endpoint,
      userinfo_endpoint: f.endpoints.userinfo_endpoint,
      scope: f.scope,
      // Set field mappings
      email_field: f.email_field,
      username_field: f.username_field,
      full_name_field: f.full_name_field,
      avatar_field: f.avatar_field,
      role_field: f.role_field,
      // Set display configuration
      icon_url: f.icon_url,
      display_name: f.display_name
    });
  }, R = (b) => {
    c(b);
  }, O = (b) => {
    z(b);
  }, { loading: C, run: E } = S(_.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : w();
    },
    onError: (b) => {
      o.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", b);
    }
  }), L = (b) => {
    E(b);
  }, U = () => {
    l ? l() : w();
  }, { loading: N, run: Q } = S(async ({ redirect_uri: b, ...f }) => {
    let B;
    return b ? B = new URL(b) : B = new URL(window.location.origin), B.pathname = Be("/system/settings/oauth/test-callback"), B.searchParams.set("provider", u), _.system.testOauthConnection({ redirect_uri: B.toString(), ...f });
  }, {
    manual: !0,
    onSuccess: ({ url: b }) => {
      window.open(b, "_blank");
    },
    onError: (b) => {
      o.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: b.message })), console.error("Failed to test OAuth connection", b);
    }
  }), P = () => u === "custom";
  return /* @__PURE__ */ e.jsx(ce, { spinning: T, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: L,
      initialValues: t || M,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(te, { onChange: R })
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
            children: /* @__PURE__ */ e.jsxs(q, { onChange: F, disabled: !n, children: [
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
              h,
              {
                disabled: !n,
                placeholder: u !== "custom" ? s(`settings.oauth.provider.options.${u}`, { defaultValue: u }) : ""
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
                pattern: be,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n, placeholder: "https://example.com/icon.png" })
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
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
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
            children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !n, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
          }
        ),
        P() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && u === "custom",
                message: s("settings.oauth.authEndpoint.required", { defaultValue: "Authorization Endpoint is required." })
              },
              {
                pattern: be,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "wellknown_endpoint",
            hidden: u !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: be,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: n && u === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        P() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && u === "custom",
                message: s("settings.oauth.tokenEndpoint.required", { defaultValue: "Token Endpoint is required." })
              },
              {
                pattern: be,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        P() && /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && u === "custom",
                message: s("settings.oauth.userInfoEndpoint.required", { defaultValue: "User Info Endpoint is required." })
              },
              {
                pattern: be,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
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
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(b) => b.getFieldValue("redirect_uri") !== "" ? {
              pattern: be,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n, placeholder: `http://${window.location.host}${Be(`/login?provider=settings.${u}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(te, { onChange: O, disabled: !n })
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
                required: n && m,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n || !m })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_mapping_mode",
            label: s("settings.oauth.roleMappingMode.label", { defaultValue: "Role Mapping Mode" }),
            tooltip: s("settings.oauth.roleMappingMode.tooltip", { defaultValue: "Controls how user roles are synchronized from OAuth2 provider." }),
            initialValue: "auto",
            children: /* @__PURE__ */ e.jsxs(q, { disabled: !n, children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: s("settings.oauth.roleMappingMode.options.disabled.label", { defaultValue: "Disabled" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "auto", children: s("settings.oauth.roleMappingMode.options.auto.label", { defaultValue: "Auto" }) }),
              /* @__PURE__ */ e.jsx(q.Option, { value: "enforce", children: s("settings.oauth.roleMappingMode.options.enforce.label", { defaultValue: "Enforce" }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          qe,
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
            children: /* @__PURE__ */ e.jsx(te, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(Ue, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          qe,
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
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "email", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "login", autoComplete: "off", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "name", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "avatar_url", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "role", disabled: !n || !p })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            I,
            {
              type: "primary",
              htmlType: "submit",
              loading: C,
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
            {
              loading: N,
              onClick: async () => {
                const b = d.getFieldsValue();
                Q(b);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
            {
              onClick: U,
              icon: /* @__PURE__ */ e.jsx(de, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, es = () => {
  const { t } = H("system"), { t: l } = H("common"), [s] = a.useForm(), { loading: i, data: d, refresh: u } = S(_.system.getSecuritySettings, {
    onSuccess: (n) => {
      s.setFieldsValue(n);
    },
    onError: (n) => {
      o.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", n);
    }
  }), { loading: x, run: p } = S(_.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), u();
    },
    onError: (n) => {
      o.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", n);
    }
  }), j = (n) => {
    p(n);
  };
  return /* @__PURE__ */ e.jsx(ce, { spinning: i, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: s,
      layout: "vertical",
      onFinish: j,
      initialValues: d,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(te, {})
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
            children: /* @__PURE__ */ e.jsx(ie, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(ie, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(te, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, c) => n.login_failure_lock !== c.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(ie, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, c) => n.login_failure_lock !== c.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(ie, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(te, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, c) => n.history_password_check !== c.history_password_check,
            children: ({ getFieldValue: n }) => n("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(ie, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(ie, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ie, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ie, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            I,
            {
              type: "primary",
              htmlType: "submit",
              loading: x,
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
            {
              onClick: () => u(),
              icon: /* @__PURE__ */ e.jsx(de, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, ts = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = H("system"), [u, x] = V([]), [p, j] = V([]), { run: n, loading: c } = S(t, {
    onError: (T) => {
      o.error(d("settings.ldap.importError", { error: `${T.message}` }));
    },
    onSuccess: (T) => {
      x(T);
    },
    manual: !0
  }), { run: m, loading: z } = S(async () => {
    for (const T of p.filter((M) => {
      const w = u.find((F) => F.ldap_dn === M);
      return !(!w || w.status === "imported");
    })) {
      const M = await l([T]);
      x((w) => [...w].map((R) => {
        for (const O of M)
          if (R.ldap_dn === O.ldap_dn)
            return { ...O, status: "imported" };
        return R;
      }));
    }
  }, {
    manual: !0
  });
  return Ce(() => {
    i.visible && (x([]), n(), j([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    W,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        m();
      },
      width: 900,
      confirmLoading: z,
      loading: c,
      children: /* @__PURE__ */ e.jsx(
        Se,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (T) => {
              j(T);
            },
            getCheckboxProps: (T) => ({
              disabled: T.status === "imported"
            })
          },
          columns: s.map(({ render: T, ...M }) => T ? {
            ...M,
            render: (w, F, R) => {
              const O = p.includes(F.ldap_dn) && z && F.status !== "imported";
              return T(w, F, R, O);
            }
          } : M),
          dataSource: u,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, ss = () => {
  var F, R, O;
  const { t } = H("system"), [l] = a.useForm(), [s, i] = V(!1), [d, u] = V(null), [x, p] = V(!1), [j, n] = V(!1), [c] = a.useForm(), [m, z] = V(!1);
  S(_.system.getLdapSettings, {
    onSuccess: (C) => {
      l.setFieldsValue(C), z(C.enabled);
    },
    onError: (C) => {
      o.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${C.message}` }));
    }
  }), Ce(() => {
    u(null);
  }, [x]);
  const T = async (C) => {
    i(!0);
    try {
      await _.system.updateLdapSettings(C), o.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      o.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: M, loading: w } = S(async (C) => {
    const E = await l.validateFields();
    return await _.system.testLdapConnection({
      ...C,
      ...E
    });
  }, {
    onSuccess: (C) => {
      u(C);
    },
    onError: (C) => {
      o.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${C.message}` }));
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
              children: /* @__PURE__ */ e.jsx(te, { onChange: (C) => z(C) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: m, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: m, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: m, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(h.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: m, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: m, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: m, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: m, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: m, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(h, { type: "number", defaultValue: 15, disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(Ue, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(te, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(te, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              I,
              {
                disabled: !m,
                style: { marginLeft: 8 },
                onClick: () => p(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ne, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              I,
              {
                disabled: !m,
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
      W,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: x,
        onCancel: () => p(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: c,
              layout: "vertical",
              onFinish: M,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(h, { disabled: !m })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !m })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(ne, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(I, { disabled: !m, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    I,
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
          /* @__PURE__ */ e.jsx(ce, { spinning: w, children: /* @__PURE__ */ e.jsx(st, { active: w, loading: w, children: d && (d.user ? /* @__PURE__ */ e.jsxs(Y, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(Y.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(Y.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(Y.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(Y.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(Y.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            lt,
            {
              direction: "vertical",
              current: (F = d.message) == null ? void 0 : F.findIndex((C) => !C.success),
              status: (R = d.message) != null && R.find((C) => !C.success) ? "error" : "finish",
              items: (O = d.message) == null ? void 0 : O.map((C) => ({
                status: C.success ? "finish" : "error",
                title: C.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      ts,
      {
        visible: j,
        onCancel: () => n(!1),
        fetchItems: () => _.system.importLdapUsers({}),
        importItems: (C) => _.system.importLdapUsers({ user_dn: C }),
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
          render: (C, E, L, U) => U ? /* @__PURE__ */ e.jsx(ce, { indicator: /* @__PURE__ */ e.jsx(gt, { spin: !0 }) }) : C ? /* @__PURE__ */ e.jsx(ft, { twoToneColor: "#52c41a" }) : E.id ? /* @__PURE__ */ e.jsx(ee, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ee, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, ls = () => {
  const { t } = H("system"), { t: l } = H("common"), [s] = a.useForm(), [i, d] = V(null), [u, x] = V(!1), [p] = a.useForm(), [j, n] = V(!1), { loading: c } = S(_.system.getSmtpSettings, {
    onSuccess: (w) => {
      s.setFieldsValue(w), n(w.enabled);
    },
    onError: (w) => {
      o.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${w.message}` }));
    }
  });
  Ce(() => {
    d(null);
  }, [u]);
  const { run: m, loading: z } = S(({ port: w, ...F }) => _.system.updateSmtpSettings({ ...F, port: Number(w) }), {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (w) => {
      o.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${w.message}` }));
    }
  }), { run: T, loading: M } = S(async (w) => {
    const { port: F, ...R } = await s.validateFields();
    return await _.system.testSmtpConnection({
      ...w,
      ...R,
      port: Number(F)
    });
  }, {
    onSuccess: (w) => {
      d(w);
    },
    onError: (w) => {
      o.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${w.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ce, { spinning: c, children: /* @__PURE__ */ e.jsxs(
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
              children: /* @__PURE__ */ e.jsx(te, { onChange: (w) => n(w) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: j, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !j, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: j, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { type: "number", disabled: !j, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: j, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !j, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !j, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: j, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(Ee.Group, { disabled: !j, children: [
                /* @__PURE__ */ e.jsx(Ee.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(Ee.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(Ee.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: j, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !j, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(h, { disabled: !j, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Ue, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Me, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Me, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Me, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(ne, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: z, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              I,
              {
                onClick: () => x(!0),
                disabled: !j || M,
                loading: M,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: u,
        onCancel: () => x(!1),
        footer: [
          /* @__PURE__ */ e.jsx(I, { onClick: () => x(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(I, { type: "primary", loading: M, onClick: () => p.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: p,
            layout: "vertical",
            onFinish: (w) => T(w),
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
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, as = () => {
  const { t, i18n: l } = H("system"), { t: s } = H("common"), [i] = a.useForm(), { loading: d, data: u, refresh: x } = S(_.system.getSystemBaseSettings, {
    onSuccess: (c) => {
      i.setFieldsValue(c);
    },
    onError: (c) => {
      o.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", c);
    }
  }), { loading: p, run: j } = S(_.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: (c) => {
      o.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", c);
    }
  }), n = (c) => {
    j(c);
  };
  return /* @__PURE__ */ e.jsx(ce, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: n,
      initialValues: u,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(We, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(h, {}) }) })
        }, ...Et.map((c) => ({
          key: c.lang,
          label: l.language !== c.lang ? s(`language.${c.lang}`, { defaultValue: c.label, lang: c.label }) : c.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", c.lang], children: /* @__PURE__ */ e.jsx(h, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(h, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(h, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(te, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(te, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            I,
            {
              type: "primary",
              htmlType: "submit",
              loading: p,
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            I,
            {
              onClick: () => x(),
              icon: /* @__PURE__ */ e.jsx(de, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: is } = h, ns = () => {
  const { t } = H("ai"), { t: l } = H("common"), s = me(), [i] = a.useForm(), [d, u] = V(!1), [x, p] = V(null), [j, n] = V(""), [c, m] = V(""), { loading: z, data: T } = S(
    () => _.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (g) => {
        o.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", g);
      }
    }
  ), M = Fe(() => T == null ? void 0 : T.find((g) => g.provider === c), [T, c]), { loading: w, data: F, refresh: R } = S(
    () => _.ai.listAiModels({ current: 1, page_size: 100, search: j }),
    {
      refreshDeps: [j],
      onError: (g) => {
        o.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", g);
      }
    }
  ), { loading: O, run: C } = S(
    ({ config: g, ...$ }) => _.ai.createAiModel({ config: g ?? {}, ...$ }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), u(!1), i.resetFields(), R();
      },
      onError: (g) => {
        o.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", g);
      }
    }
  ), { loading: E, run: L } = S(
    ({ id: g, data: $ }) => _.ai.updateAiModel({ id: g }, $),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), u(!1), i.resetFields(), p(null), R();
      },
      onError: (g) => {
        o.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", g);
      }
    }
  ), { runAsync: U } = S(
    (g) => _.ai.deleteAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), R();
      },
      onError: (g) => {
        o.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", g);
      }
    }
  ), { runAsync: N } = S(
    (g) => _.ai.testAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (g) => {
        o.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", g);
      }
    }
  ), { runAsync: Q } = S(
    (g) => _.ai.setDefaultAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), R();
      },
      onError: (g) => {
        o.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", g);
      }
    }
  ), P = () => {
    p(null), m(""), i.resetFields(), u(!0);
  }, b = (g) => {
    p(g), m(g.provider);
    const $ = g.config || {}, ae = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      is_default: g.is_default,
      config: $,
      // Spread config fields to form
      status: g.status
    };
    i.setFieldsValue(ae), u(!0);
  }, f = (g) => {
    m(g), i.setFieldValue("config", void 0);
  }, B = (g) => {
    let $ = g.config ?? {};
    const ae = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      config: $,
      is_default: g.is_default,
      status: g.status
    };
    x ? L({ id: x.id, data: ae }) : C(ae);
  }, le = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (g, $) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: g }),
        $.is_default && /* @__PURE__ */ e.jsx(at, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(pt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (g) => /* @__PURE__ */ e.jsx(ee, { color: "blue", children: g.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (g) => /* @__PURE__ */ e.jsx(ee, { color: g === "enabled" ? "green" : "red", children: g === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (g, $) => /* @__PURE__ */ e.jsx(Te, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(Ge, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => N($.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(ht, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => Q($.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: l("edit", { defaultValue: "Edit" }),
          onClick: async () => b($)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => U($.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Z, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Re, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsx(
        h.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: j,
          onChange: (g) => n(g.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(ne, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          I,
          {
            icon: /* @__PURE__ */ e.jsx(xt, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          I,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(de, {}),
            onClick: R,
            loading: w,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ne, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          I,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(_e, {}),
            onClick: P,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(Z, { children: /* @__PURE__ */ e.jsx(
      Se,
      {
        columns: le,
        dataSource: (F == null ? void 0 : F.data) || [],
        loading: w,
        rowKey: "id",
        pagination: {
          total: (F == null ? void 0 : F.total) || 0,
          current: (F == null ? void 0 : F.current) || 1,
          pageSize: (F == null ? void 0 : F.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (g, $) => l("pagination.total", {
            defaultValue: `${$[0]}-${$[1]} of ${g} items`,
            start: $[0],
            end: $[1],
            total: g
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: x ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          u(!1), i.resetFields(), p(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: B,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    is,
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
                      loading: z,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: f,
                      value: c,
                      options: T == null ? void 0 : T.map((g) => ({
                        label: g.name,
                        value: g.provider
                      }))
                    }
                  )
                }
              ),
              M && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(
                zt,
                {
                  schema: M.config_schema
                }
              ) }),
              /* @__PURE__ */ e.jsxs(
                a.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(te, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: O || E,
                    children: x ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    onClick: () => {
                      u(!1), i.resetFields(), p(null), m("");
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
}, { TextArea: os } = h, rs = () => {
  var J;
  const { t } = H("system"), { t: l } = H("common"), [s] = a.useForm(), [i, d] = V(!1), [u, x] = V(null), [p, j] = V(""), [n, c] = V(!1), [m, z] = V(null), [T, M] = V(""), [w, F] = V(!1), [R, O] = V([]), [C, E] = V(), { loading: L, data: U, refresh: N } = S(
    () => _.system.listToolSets({ current: 1, page_size: 100, search: p, type: C }),
    {
      refreshDeps: [p, C],
      onError: (r) => {
        o.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", r);
      }
    }
  ), { loading: Q, data: P } = S(
    () => _.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (r) => {
        o.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", r);
      }
    }
  ), b = Fe(() => P == null ? void 0 : P.find((r) => r.tool_set_type === T), [P, T]), { loading: f, run: B } = S(
    (r) => _.system.createToolSet({
      ...r,
      type: r.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), d(!1), s.resetFields(), N();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", r);
      }
    }
  ), { loading: le, run: g } = S(
    ({ id: r, data: D }) => _.system.updateToolSet({ id: r }, {
      ...D,
      type: D.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), s.resetFields(), x(null), N();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", r);
      }
    }
  ), { run: $ } = S(
    (r) => _.system.deleteToolSet({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), N();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", r);
      }
    }
  ), { runAsync: ae } = S(
    (r) => _.system.testToolSet({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (r) => {
        o.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", r);
      }
    }
  ), { loading: se, runAsync: v } = S(
    (r) => _.system.getToolSetTools({ id: r }),
    {
      manual: !0,
      onSuccess: (r) => {
        O(r || []), F(!0);
      },
      onError: (r) => {
        o.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", r);
      }
    }
  ), { runAsync: X } = S(
    ({ id: r, status: D }) => _.system.updateToolSetStatus({ id: r }, { status: D }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), N();
      },
      onError: (r) => {
        o.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", r);
      }
    }
  ), he = () => {
    x(null), s.resetFields(), M(""), d(!0);
  }, re = (r) => {
    x(r), M(r.type);
    const D = { ...r };
    s.setFieldsValue(D), d(!0);
  }, ge = (r) => {
    M(r), s.setFieldValue("config", {});
  }, fe = (r) => {
    u ? g({ id: u.id, data: r }) : B(r);
  }, xe = (r) => {
    $(r);
  }, pe = (r) => {
    z(r), c(!0);
  }, je = (r) => {
    const D = r.status === "enabled" ? "disabled" : "enabled";
    return X({ id: r.id, status: D });
  }, y = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (r) => /* @__PURE__ */ e.jsx(ee, { color: "blue", children: r.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (r) => /* @__PURE__ */ e.jsx(ee, { color: r === "enabled" ? "green" : "red", children: r === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (r, D) => /* @__PURE__ */ e.jsx(Te, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(yt, {}),
          disabled: D.status !== "enabled",
          onClick: async () => ae(D.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Le, {}),
          permission: "system:toolsets:view",
          disabled: D.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => v(D.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(jt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => pe(D.config),
          disabled: !D.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          onClick: async () => re(D)
        },
        {
          key: "toggleStatus",
          icon: D.status === "enabled" ? /* @__PURE__ */ e.jsx(bt, {}) : /* @__PURE__ */ e.jsx(Ge, {}),
          onClick: async () => je(D),
          permission: "system:toolsets:update",
          tooltip: D.status === "enabled" ? l("disable", { defaultValue: "Disable" }) : l("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(ye, {}),
          permission: "system:toolsets:delete",
          tooltip: l("delete", { defaultValue: "Delete" }),
          onClick: async () => xe(D.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => xe(D.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Z, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Re, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          h.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            value: p,
            onChange: (r) => j(r.target.value),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          q,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: C,
            onChange: (r) => E(r),
            options: P == null ? void 0 : P.map((r) => ({
              label: r.name,
              value: r.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "", children: "All" }),
              P == null ? void 0 : P.map((r) => /* @__PURE__ */ e.jsx(q.Option, { value: r.tool_set_type, children: r.name }, r.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(Ve, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          I,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(de, {}),
            onClick: N,
            loading: L,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          I,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(_e, {}),
            onClick: he,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(Z, { children: /* @__PURE__ */ e.jsx(
      Se,
      {
        columns: y,
        dataSource: (U == null ? void 0 : U.data) || [],
        loading: L,
        rowKey: "id",
        pagination: {
          total: (U == null ? void 0 : U.total) || 0,
          current: (U == null ? void 0 : U.current) || 1,
          pageSize: (U == null ? void 0 : U.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (r, D) => l("pagination.total", {
            defaultValue: `${D[0]}-${D[1]} of ${r} items`,
            start: D[0],
            end: D[1],
            total: r
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: u ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          d(!1), s.resetFields(), x(null), M("");
        },
        footer: null,
        width: ((J = b == null ? void 0 : b.ui_schema) == null ? void 0 : J["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: fe,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    os,
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
                      loading: Q,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: ge,
                      value: T,
                      options: P == null ? void 0 : P.map((r) => ({
                        label: r.name,
                        value: r.tool_set_type
                      }))
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                Ot,
                {
                  name: "config",
                  schema: b == null ? void 0 : b.config_schema,
                  uiSchema: b == null ? void 0 : b.ui_schema
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: f || le,
                    children: u ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  I,
                  {
                    onClick: () => {
                      d(!1), s.resetFields(), x(null), M("");
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
      W,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: n,
        onCancel: () => c(!1),
        footer: [
          /* @__PURE__ */ e.jsx(I, { onClick: () => c(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(m, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: w,
        onCancel: () => F(!1),
        footer: [
          /* @__PURE__ */ e.jsx(I, { onClick: () => F(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: se ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(de, { style: { fontSize: 24 }, spin: !0 }) }) : R.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : R.map((r, D) => {
          var Ae, k, A;
          return /* @__PURE__ */ e.jsx(
            Z,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(Le, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((Ae = r.function) == null ? void 0 : Ae.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Re, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((k = r.function) == null ? void 0 : k.description) || "-" })
                ] }),
                ((A = r.function) == null ? void 0 : A.parameters) && /* @__PURE__ */ e.jsxs(Ve, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(r.function.parameters, null, 2) })
                ] })
              ] })
            },
            D
          );
        }) })
      }
    )
  ] });
}, { TextArea: Ke } = h, ds = () => {
  const { t } = H("system"), { t: l } = H("common"), s = me(), [i] = a.useForm(), [d, u] = V(""), [x, p] = V(), [j, n] = V(!1), [c, m] = V(null), [z, T] = V(!1), [M] = a.useForm(), { loading: w, data: F, refresh: R } = S(
    () => _.system.listSkills({
      current: 1,
      page_size: 100,
      search: d || void 0,
      domain: x
    }),
    {
      refreshDeps: [d, x],
      onError: () => {
        o.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: O } = S(() => _.system.listSkillDomains()), C = O ?? [], E = (F == null ? void 0 : F.data) ?? [], L = (F == null ? void 0 : F.total) ?? 0, { loading: U, run: N } = S(
    (v) => _.system.createSkill(v),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" })), n(!1), i.resetFields(), R();
      },
      onError: () => {
        o.error(t("settings.skills.createFailed", { defaultValue: "Failed to create skill" }));
      }
    }
  ), { loading: Q, run: P } = S(
    ({ id: v, body: X }) => _.system.updateSkill({ id: v }, X),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" })), n(!1), m(null), i.resetFields(), R();
      },
      onError: () => {
        o.error(t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }));
      }
    }
  ), { run: b } = S(
    (v) => _.system.deleteSkill({ id: v }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), R();
      },
      onError: () => {
        o.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), { loading: f, run: B } = S(
    (v) => _.system.uploadSkill(v.body, v.file),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), T(!1), M.resetFields(), R();
      },
      onError: () => {
        o.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), le = () => {
    m(null), i.resetFields(), n(!0);
  }, g = (v) => {
    m(v), i.setFieldsValue({
      name: v.name,
      description: v.description,
      category: v.category,
      domain: v.domain
    }), n(!0);
  }, $ = () => {
    i.validateFields().then((v) => {
      c ? P({
        id: c.id,
        body: {
          name: v.name,
          description: v.description ?? "",
          category: v.category ?? "",
          domain: v.domain ?? ""
        }
      }) : N({
        name: v.name,
        description: v.description ?? "",
        category: v.category ?? "",
        domain: v.domain ?? "",
        content: v.content ?? ""
      });
    });
  }, ae = () => {
    var ge, fe;
    const v = (ge = M.getFieldValue("file")) == null ? void 0 : ge.fileList, X = ((fe = v == null ? void 0 : v[0]) == null ? void 0 : fe.originFileObj) ?? (v == null ? void 0 : v[0]);
    if (!X) {
      o.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const he = M.getFieldValue("category"), re = M.getFieldValue("domain");
    B({ body: { category: he, domain: re }, file: X });
  }, se = [
    { title: t("settings.skills.name", { defaultValue: "Name" }), dataIndex: "name", key: "name" },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (v) => v ? /* @__PURE__ */ e.jsx(ee, { children: v }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (v) => v ? /* @__PURE__ */ e.jsx(ee, { color: "blue", children: v }) : "-" },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 150,
      render: (v, X) => /* @__PURE__ */ e.jsx(
        Te,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx(ze, {}),
              onClick: async () => s(`/system/settings/skills/${X.id}/edit`),
              permission: "system:skills:edit_files"
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ze, {}),
              onClick: async () => s(`/system/settings/skills/${X.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: async () => g(X),
              permission: "system:skills:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ye, {}),
              danger: !0,
              confirm: {
                title: l("confirmDelete", { defaultValue: "Confirm delete?" }),
                onConfirm: async () => b(X.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    Z,
    {
      title: t("settings.skills.title", { defaultValue: "AI Agent Skills" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          h.Search,
          {
            placeholder: l("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: u,
            style: { width: 200 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          q,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: x,
            onChange: p,
            options: C.map((v) => ({ value: v, label: v }))
          }
        ),
        /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(de, {}), onClick: () => R(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: le, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx($e, {}), onClick: () => T(!0), children: t("settings.skills.upload", { defaultValue: "Upload" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsx(
          Se,
          {
            rowKey: "id",
            loading: w,
            columns: se,
            dataSource: E,
            pagination: { total: L, pageSize: 10, showSizeChanger: !0 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: c ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
            open: j,
            onOk: $,
            onCancel: () => {
              n(!1), m(null);
            },
            confirmLoading: U || Q,
            width: 560,
            children: /* @__PURE__ */ e.jsxs(a, { form: i, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(Ke, { rows: 2 }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: C.map((v) => ({ value: v, label: v })) }) }),
              !c && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(Ke, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
            open: z,
            onOk: ae,
            onCancel: () => T(!1),
            confirmLoading: f,
            children: /* @__PURE__ */ e.jsxs(a, { form: M, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(it, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx($e, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: C.map((v) => ({ value: v, label: v })) }) })
            ] })
          }
        )
      ]
    }
  );
}, us = () => {
  const t = me(), { t: l } = H("system"), { t: s } = H("task"), { t: i } = H("common"), [d] = a.useForm(), { data: u } = S(_.system.listLogStorageBackends), x = (u ?? []).map((z) => ({
    value: z.id,
    label: l(`settings.task.logStorage.${z.id}`, { defaultValue: z.name })
  })), { loading: p, refresh: j } = S(_.system.getTaskSettings, {
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
      o.error(l("settings.fetchFailed", { defaultValue: "Failed to fetch settings" }));
    }
  }), { loading: n, run: c } = S(_.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), j();
    },
    onError: () => {
      o.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), m = (z) => {
    c(z);
  };
  return /* @__PURE__ */ e.jsx(ce, { spinning: p, children: /* @__PURE__ */ e.jsxs(
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
              q,
              {
                options: x,
                placeholder: l("settings.task.logStoragePlaceholder", { defaultValue: "Select backend" }),
                loading: u === void 0
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
            children: /* @__PURE__ */ e.jsx(ie, { min: 1, max: 100, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(ie, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
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
            children: /* @__PURE__ */ e.jsx(ie, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
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
            children: /* @__PURE__ */ e.jsx(ie, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(I, { type: "primary", htmlType: "submit", loading: n, icon: /* @__PURE__ */ e.jsx(Ie, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(I, { onClick: () => j(), icon: /* @__PURE__ */ e.jsx(de, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(ne, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(Vt, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: cs } = h, ms = () => {
  const t = me(), { t: l } = H("system"), { t: s } = H("common"), [i] = a.useForm(), [d, u] = V(!1), [x, p] = V(null), [j, n] = V(""), [c, m] = V(1), [z, T] = V(10), { loading: M, data: w, refresh: F } = S(
    () => Lt({ current: c, page_size: z, search: j }),
    {
      refreshDeps: [c, z, j],
      onError: (f) => {
        o.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", f);
      }
    }
  ), { loading: R, run: O } = S(
    (f) => Ut(f),
    {
      manual: !0,
      onSuccess: () => {
        o.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), u(!1), i.resetFields(), p(null), F();
      },
      onError: (f) => {
        o.error((f == null ? void 0 : f.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: C, run: E } = S(
    ({ id: f, ...B }) => Dt({ id: f }, B),
    {
      manual: !0,
      onSuccess: () => {
        o.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), u(!1), i.resetFields(), p(null), F();
      },
      onError: (f) => {
        o.error((f == null ? void 0 : f.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: L } = S(
    (f) => Nt({ id: f }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), F();
      },
      onError: (f) => {
        o.error((f == null ? void 0 : f.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), U = () => {
    p(null), i.resetFields(), i.setFieldsValue({ status: "active" }), u(!0);
  }, N = (f) => {
    p(f), i.setFieldsValue({
      name: f.name,
      description: f.description,
      status: f.status
    }), u(!0);
  }, Q = (f) => {
    W.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${f.name}"? This action cannot be undone.`
      }),
      onOk: () => L(f.id)
    });
  }, P = () => {
    i.validateFields().then((f) => {
      x ? E({ id: x.id, ...f }) : O(f);
    });
  }, b = [
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
      render: (f) => /* @__PURE__ */ e.jsx(ee, { color: f === "active" ? "green" : "default", children: f === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (f, B) => /* @__PURE__ */ e.jsx(
        Te,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(Ze, {}),
              onClick: async () => t(`/system/settings/organizations/${B.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: async () => N(B),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(ye, {}),
              danger: !0,
              onClick: async () => Q(B),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    Z,
    {
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(de, {}), onClick: F, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ne, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: U, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            h.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (f) => {
                n(f), m(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Se,
            {
              columns: b,
              dataSource: (w == null ? void 0 : w.data) || [],
              loading: M,
              rowKey: "id",
              pagination: {
                current: c,
                pageSize: z,
                total: (w == null ? void 0 : w.total) || 0,
                showSizeChanger: !0,
                showTotal: (f, B) => s("pagination.total", {
                  defaultValue: `${B[0]}-${B[1]} of ${f} items`,
                  start: B[0],
                  end: B[1],
                  total: f
                }),
                onChange: (f, B) => {
                  m(f), T(B);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: x ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: d,
            onOk: P,
            onCancel: () => {
              u(!1), i.resetFields(), p(null);
            },
            confirmLoading: R || C,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: i, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(cs, { rows: 3 })
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
}, gs = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = H("system"), s = me(), i = Pt(), x = i.hash.replace("#", "") || "base", { enableMultiOrg: p } = Jt(), { hasPermission: j } = Wt(), n = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(as, {}),
      hidden: !j("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(es, {}),
      hidden: !j("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Yt, {}),
      hidden: !j("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(ss, {}),
      hidden: !j("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(ls, {}),
      hidden: !j("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(ns, {}),
      hidden: !j("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(rs, {}),
      hidden: !j("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(ds, {}),
      hidden: !j("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(us, {}),
      hidden: !j("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...p ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(ms, {}),
      hidden: !j("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(Z, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    We,
    {
      defaultActiveKey: x,
      onChange: (c) => {
        s(`${i.pathname}#${c}`);
      },
      items: t(n.filter((c) => !c.hidden), l)
    }
  ) });
}, $s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gs
}, Symbol.toStringTag, { value: "Module" })), fs = () => {
  var xe, pe, je;
  const t = me(), { id: l } = De(), { t: s } = H("system"), { t: i } = H("common"), [d] = a.useForm(), [u] = a.useForm(), [x, p] = V(!1), [j, n] = V(!1), [c, m] = V(null), [z, T] = V(""), [M, w] = V(1), [F, R] = V(10), { data: O, loading: C, refresh: E } = S(
    () => qt({ id: l }),
    {
      ready: !!l,
      onError: (y) => {
        o.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", y);
      }
    }
  ), { data: L, loading: U, refresh: N } = S(
    () => $t({ id: l, current: M, page_size: F, search: z }),
    {
      ready: !!l,
      refreshDeps: [l, M, F, z],
      onError: (y) => {
        o.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", y);
      }
    }
  ), { data: Q, loading: P } = S(
    () => Gt({ current: 1, page_size: 1e3 }),
    {
      ready: x
    }
  ), { data: b, loading: f } = S(
    () => Zt({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: B, run: le } = S(
    (y) => Bt({ id: l }, y),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), p(!1), d.resetFields(), N();
      },
      onError: (y) => {
        o.error((y == null ? void 0 : y.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: g, run: $ } = S(
    (y) => Ht({ id: l, user_id: c == null ? void 0 : c.id }, y),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), n(!1), u.resetFields(), m(null), N();
      },
      onError: (y) => {
        o.error((y == null ? void 0 : y.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: ae } = S(
    (y) => Kt({ id: l, user_id: y }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), N();
      },
      onError: (y) => {
        o.error((y == null ? void 0 : y.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), se = () => {
    p(!0), d.resetFields();
  }, v = (y) => {
    var J;
    m(y), u.setFieldsValue({
      role_ids: ((J = y.organization_roles) == null ? void 0 : J.map((r) => r.id)) || []
    }), n(!0);
  }, X = (y) => {
    W.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${y.full_name || y.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => ae(y.id)
    });
  }, he = () => {
    d.validateFields().then((y) => {
      le(y);
    });
  }, re = () => {
    u.validateFields().then((y) => {
      $(y);
    });
  }, ge = ((xe = Q == null ? void 0 : Q.data) == null ? void 0 : xe.filter((y) => {
    var J;
    return !((J = L == null ? void 0 : L.data) != null && J.some((r) => r.id === y.id));
  })) || [], fe = [
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
      render: (y) => /* @__PURE__ */ e.jsx(ee, { color: y === "active" ? "green" : "default", children: y === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : y })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (y, J) => {
        var r;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((r = J.organization_roles) == null ? void 0 : r.map((D) => /* @__PURE__ */ e.jsx(ee, { children: D.name }, D.id))) || /* @__PURE__ */ e.jsx(ee, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (y, J) => /* @__PURE__ */ e.jsx(
        Te,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: async () => v(J)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(ye, {}),
              danger: !0,
              onClick: async () => X(J)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            I,
            {
              icon: /* @__PURE__ */ e.jsx(Qe, {}),
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
        extra: /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(de, {}), onClick: () => {
          E(), N();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: C,
        children: /* @__PURE__ */ e.jsxs(Y, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(Y.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: O == null ? void 0 : O.name }),
          /* @__PURE__ */ e.jsx(Y.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ee, { color: (O == null ? void 0 : O.status) === "active" ? "green" : "default", children: (O == null ? void 0 : O.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(Y.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (O == null ? void 0 : O.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      Z,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: se, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            h.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (y) => {
                T(y), w(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Se,
            {
              columns: fe,
              dataSource: (L == null ? void 0 : L.data) || [],
              loading: U,
              rowKey: "id",
              pagination: {
                current: M,
                pageSize: F,
                total: (L == null ? void 0 : L.total) || 0,
                showSizeChanger: !0,
                showTotal: (y) => i("pagination.total", { defaultValue: `Total ${y} items` }),
                onChange: (y, J) => {
                  w(y), R(J);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: x,
        onOk: he,
        onCancel: () => {
          p(!1), d.resetFields();
        },
        confirmLoading: B,
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
                  loading: P,
                  filterOption: (y, J) => ((J == null ? void 0 : J.label) ?? "").toLowerCase().includes(y.toLowerCase()),
                  options: ge.map((y) => ({
                    label: `${y.full_name || y.username} (${y.email})`,
                    value: y.id
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
                  loading: f,
                  options: ((pe = b == null ? void 0 : b.data) == null ? void 0 : pe.map((y) => ({
                    label: y.name,
                    value: y.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      W,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: j,
        onOk: re,
        onCancel: () => {
          n(!1), u.resetFields(), m(null);
        },
        confirmLoading: g,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: u, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                h,
                {
                  value: (c == null ? void 0 : c.full_name) || (c == null ? void 0 : c.username),
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
                  loading: f,
                  options: ((je = b == null ? void 0 : b.data) == null ? void 0 : je.map((y) => ({
                    label: y.name,
                    value: y.id
                  }))) || []
                }
              )
            }
          )
        ] })
      }
    )
  ] });
}, Bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fs
}, Symbol.toStringTag, { value: "Module" })), ps = Qt(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: Je } = h, hs = (t) => t.toLowerCase().endsWith(".md");
function tt(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(Xe, {}) : /* @__PURE__ */ e.jsx(Ye, {}),
      children: (s = l.children) != null && s.length ? tt(l.children) : void 0
    };
  });
}
function Pe(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const xs = () => {
  const { styles: t } = ps(), { id: l } = De(), s = me(), { t: i } = H("system"), [d, u] = V(null), [x, p] = V(null), [j, n] = V(!1), [c, m] = V(""), [z, T] = V(!1), [M, w] = V([]), [F, R] = V(!1), [O, C] = V(!1), [E, L] = V(""), [U] = a.useForm(), [N, Q] = V(null), [P, b] = V(null), [f, B] = V(""), [le] = a.useForm(), { data: g } = S(
    () => l ? _.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: $, loading: ae, refresh: se } = S(
    () => l ? _.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (k) => {
        if (!d) {
          for (const A of k)
            if (!A.is_dir && A.name === "SKILL.md") {
              p(A.path), u(A.path), n(!1);
              return;
            }
          for (const A of k)
            if (!A.is_dir && A.name === "SKILLS.md") {
              p(A.path), u(A.path), n(!1);
              return;
            }
        }
      }
    }
  ), v = (g == null ? void 0 : g.data) ?? g, X = ($ == null ? void 0 : $.data) ?? $ ?? [], he = Fe(() => tt(X), [X]), re = j && x ? x : d ? Pe(d) : "";
  Ce(() => {
    d && l ? (_.system.getSkillFile({ id: l, path: d }).then((k) => m((k == null ? void 0 : k.data) ?? k ?? "")).catch(() => o.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), T(!1)) : (m(""), T(!1));
  }, [l, d, i]);
  const ge = () => {
    !l || !d || _.system.putSkillFile({ id: l, path: d }, c).then(() => {
      o.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), T(!1);
    }).catch(() => o.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, fe = (k, A) => {
    const G = String(A.node.key), oe = !A.node.isLeaf;
    p(G), n(oe), A.node.isLeaf ? u(G) : u(null);
  }, xe = (k) => {
    k.event.preventDefault(), Q({
      path: String(k.node.key),
      isDir: !k.node.isLeaf,
      x: k.event.clientX,
      y: k.event.clientY
    });
  }, pe = we(() => Q(null), []), je = we(
    (k) => {
      if (!l || !N) return;
      const { path: A, isDir: G } = N;
      switch (pe(), k) {
        case "open":
          u(A), p(A), n(!1);
          break;
        case "rename": {
          const oe = A.includes("/") ? A.split("/").pop() : A;
          b({ path: A, isDir: G }), B(oe), setTimeout(() => le.setFieldsValue({ name: oe }), 0);
          break;
        }
        case "delete":
          W.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: G ? i("settings.skills.editor.deleteConfirmContentDir", { path: A, defaultValue: `Delete ${A}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: A, defaultValue: `Delete ${A}?` }),
            onOk: () => _.system.deleteSkillPath({ id: l, path: A }).then(() => {
              o.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === A && (u(null), m("")), x === A && (p(null), n(!1)), se();
            }).catch(() => o.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          p(A), n(G), R(!0);
          break;
        case "newDir":
          p(A), n(G), C(!0);
          break;
      }
    },
    [l, N, pe, se, d, x, le, i]
  ), y = () => {
    if (!l || !P) return;
    const k = (le.getFieldValue("name") ?? f).trim();
    if (!k) {
      o.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!P.isDir && !/\.(md|txt)$/i.test(k)) {
      o.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const A = Pe(P.path), G = A ? `${A}/${k}` : k;
    if (G === P.path) {
      b(null);
      return;
    }
    _.system.moveSkillPath({ id: l }, { from_path: P.path, to_path: G }).then(() => {
      o.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === P.path && u(G), x === P.path && p(G), b(null), se();
    }).catch(() => o.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, J = (k) => {
    if (!l) return;
    const A = String(k.dragNode.key), G = String(k.dragNode.title);
    let oe;
    if (k.dropToGap) {
      const Ne = Pe(String(k.node.key));
      oe = Ne ? `${Ne}/${G}` : G;
    } else
      oe = `${k.node.key}/${G}`;
    oe !== A && _.system.moveSkillPath({ id: l }, { from_path: A, to_path: oe }).then(() => {
      o.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === A && u(oe), x === A && p(oe), se();
    }).catch(() => o.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, r = () => {
    const k = E.trim();
    if (!k || !l) return;
    const A = re ? `${re}/${k}` : k;
    if (!/\.(md|txt)$/i.test(k)) {
      o.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    _.system.putSkillFile({ id: l, path: A }, "").then(() => {
      o.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), R(!1), L(""), se(), u(A), m("");
    }).catch(() => o.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, D = () => {
    var G;
    const k = (G = U.getFieldValue("name")) == null ? void 0 : G.trim();
    if (!k || !l) return;
    const A = re ? `${re}/${k}` : k;
    _.system.createSkillDir({ id: l }, { path: A }).then(() => {
      o.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), C(!1), U.resetFields(), se();
    }).catch(() => o.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, Ae = () => {
    const k = x || d;
    !l || !k || W.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: k, defaultValue: `Delete ${k}?` }),
      onOk: () => _.system.deleteSkillPath({ id: l, path: k }).then(() => {
        o.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === k && (u(null), m("")), x === k && (p(null), n(!1)), se();
      }).catch(() => o.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    Z,
    {
      title: (v == null ? void 0 : v.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(I, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(I, { size: "small", icon: /* @__PURE__ */ e.jsx(_e, {}), onClick: () => R(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(I, { size: "small", icon: /* @__PURE__ */ e.jsx(Xe, {}), onClick: () => C(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            ae ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              nt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !0,
                expandedKeys: M,
                onExpand: (k) => w(k),
                selectedKeys: x ? [x] : [],
                onSelect: fe,
                onRightClick: xe,
                onDrop: J,
                className: t.fileTree,
                treeData: he
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(I, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: !z, onClick: ge, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(I, { danger: !0, icon: /* @__PURE__ */ e.jsx(ye, {}), onClick: Ae, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              hs(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  Je,
                  {
                    value: c,
                    onChange: (k) => {
                      m(k.target.value), T(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(et, { content: Tt(c) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                Je,
                {
                  value: c,
                  onChange: (k) => {
                    m(k.target.value), T(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        N && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: pe,
              onContextMenu: (k) => k.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: N.x, top: N.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            ot,
            {
              selectable: !1,
              items: [
                ...N.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Ye, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(ve, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(ye, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(kt, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(St, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: k }) => je(k)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(W, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: F, onOk: r, onCancel: () => {
          R(!1), L("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(h, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: E, onChange: (k) => L(k.target.value) }) }),
        /* @__PURE__ */ e.jsx(W, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: O, onOk: () => U.validateFields().then(D), onCancel: () => C(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: U, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(h, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          W,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!P,
            onOk: y,
            onCancel: () => b(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: le, layout: "vertical", onValuesChange: (k, A) => B(A.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: P != null && P.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              h,
              {
                placeholder: P != null && P.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => y()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, Hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xs
}, Symbol.toStringTag, { value: "Module" })), ys = () => {
  var m;
  const { id: t } = De(), l = me(), { t: s } = H("system"), { data: i, loading: d } = S(
    () => t ? _.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: u, loading: x } = S(
    () => t ? _.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t, onError: () => o.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })) }
  ), p = (i == null ? void 0 : i.data) ?? i, j = ((m = u == null ? void 0 : u.data) == null ? void 0 : m.content) ?? (u == null ? void 0 : u.content) ?? "", n = At(j);
  if (!t) return null;
  const c = d || x;
  return /* @__PURE__ */ e.jsx(
    Z,
    {
      title: (p == null ? void 0 : p.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(I, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      children: /* @__PURE__ */ e.jsx(ce, { spinning: c, children: /* @__PURE__ */ e.jsx("div", { style: { minHeight: 200 }, children: !c && /* @__PURE__ */ e.jsx(et, { content: n }) }) })
    }
  );
}, Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ys
}, Symbol.toStringTag, { value: "Module" })), { Text: ue, Title: js } = dt, bs = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx(It, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(Ct, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Ft, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(Le, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx(ze, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(wt, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx(ze, {}) }
};
function Oe(t) {
  try {
    return { parsed: JSON.parse(t), isJSON: !0 };
  } catch {
    return { parsed: null, isJSON: !1 };
  }
}
const ke = ({
  content: t,
  maxHeight: l = 400
}) => {
  const { parsed: s, isJSON: i } = Oe(t);
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
}, Vs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Oe(t);
  return i ? /* @__PURE__ */ e.jsxs(Y, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      Y.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      Y.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      Y.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      Y.Item,
      {
        label: l("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(ke, { content: t });
}, ks = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Oe(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(ue, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ee, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(ue, { strong: !0, children: [
        l("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ke, { content: s.arguments, maxHeight: 200 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ke, { content: t });
}, Ss = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Oe(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(ue, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(ue, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(ue, { strong: !0, children: [
        l("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(ke, { content: s.result, maxHeight: 300 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(ke, { content: t });
}, vs = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Vs, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(ks, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Ss, { content: t.content, t: l });
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
      return /* @__PURE__ */ e.jsx(ke, { content: t.content });
  }
}, _s = () => {
  const { t } = H("ai"), l = me(), [s, i] = V(""), [d, u] = V(""), {
    data: x,
    loading: p,
    refresh: j
  } = S(() => _.ai.getAiTraceStatus(), {
    onError: () => {
      o.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), n = (x == null ? void 0 : x.enabled) ?? !1, { loading: c, run: m } = S(
    (E) => _.ai.toggleAiTrace({ enabled: E }),
    {
      manual: !0,
      onSuccess: (E, [L]) => {
        o.success(
          L ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), j(), L || u("");
      },
      onError: () => {
        o.error(
          t("trace.toggleFailed", {
            defaultValue: "Failed to toggle AI debug tracing"
          })
        );
      }
    }
  ), {
    data: z,
    loading: T,
    run: M
  } = S(
    (E) => _.ai.getAiTraceEvents({ trace_id: E }),
    {
      manual: !0,
      onError: () => {
        o.error(
          t("trace.fetchFailed", {
            defaultValue: "Failed to fetch trace events"
          })
        );
      }
    }
  ), w = we(() => {
    s.trim() && (u(s.trim()), M(s.trim()));
  }, [s, M]), F = we(
    (E) => {
      const L = E ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      W.confirm({
        title: E ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: L,
        onOk: () => m(E)
      });
    },
    [t, m]
  ), R = we(async () => {
    if (d)
      try {
        const E = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!E.ok) throw new Error("download failed");
        const L = await E.blob(), U = window.URL.createObjectURL(L), N = document.createElement("a");
        N.href = U, N.download = `ai-trace-${d}.json`, document.body.appendChild(N), N.click(), window.URL.revokeObjectURL(U), document.body.removeChild(N);
      } catch {
        o.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), O = Fe(() => z ?? [], [z]), C = Fe(
    () => O.map((E) => {
      const L = bs[E.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx(ze, {})
      }, U = t(
        `trace.eventTypes.${E.event_type}`,
        { defaultValue: E.event_type }
      );
      return {
        key: E.id,
        dot: L.icon,
        color: L.color,
        children: /* @__PURE__ */ e.jsx(
          rt,
          {
            size: "small",
            defaultActiveKey: [E.id],
            items: [
              {
                key: E.id,
                label: /* @__PURE__ */ e.jsxs(K, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ee, { color: L.color, children: U }),
                  /* @__PURE__ */ e.jsxs(ue, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    E.step_order
                  ] }),
                  E.duration_ms > 0 && /* @__PURE__ */ e.jsxs(ue, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    E.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(ue, { type: "secondary", style: { fontSize: 12 }, children: new Date(E.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(vs, { event: E, t })
              }
            ]
          }
        )
      };
    }),
    [O, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(Z, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(
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
              I,
              {
                icon: /* @__PURE__ */ e.jsx(Qe, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(js, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(ue, { children: n ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              te,
              {
                checked: n,
                loading: p || c,
                onChange: F
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(Z, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(K.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        h,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (E) => i(E.target.value),
          onPressEnter: w,
          prefix: /* @__PURE__ */ e.jsx(vt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(I, { type: "primary", onClick: w, loading: T, children: t("trace.search", { defaultValue: "Search" }) }),
      d && O.length > 0 && /* @__PURE__ */ e.jsx(I, { icon: /* @__PURE__ */ e.jsx(_t, {}), onClick: R, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    T ? /* @__PURE__ */ e.jsx(Z, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ce, { size: "large" }) }) }) : d && O.length === 0 ? /* @__PURE__ */ e.jsx(Z, { children: /* @__PURE__ */ e.jsx(
      ut,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : O.length > 0 ? /* @__PURE__ */ e.jsx(Z, { children: /* @__PURE__ */ e.jsx(ct, { items: C }) }) : null
  ] });
}, Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _s
}, Symbol.toStringTag, { value: "Module" })), ws = () => {
  const { t } = H("system"), [l] = Rt(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [u, x] = V(null), [p, j] = V(null), [n, c] = V(null);
  return S(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const m = await _.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!m.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!m.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    x(m.user), j(m.user_info);
  }, {
    onSuccess: () => {
      c({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (m) => {
      c({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: m.message
      });
    }
  }), n ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    mt,
    {
      status: n.status,
      title: n.message,
      subTitle: n.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !p || !u ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(Z, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(He, { src: p || {} }) }),
        /* @__PURE__ */ e.jsx(Z, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(He, { src: u || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Mt, {});
}, Ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ws
}, Symbol.toStringTag, { value: "Module" }));
export {
  Js as A,
  Bs as O,
  Hs as S,
  Ks as a,
  Ws as b,
  $s as i
};
