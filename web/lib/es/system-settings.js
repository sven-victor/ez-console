import { j as e, R as Ae, i as Le } from "./vendor.js";
import { Form as l, message as o, Spin as he, Switch as le, Select as q, Input as h, Alert as Ue, Divider as Me, Space as Z, Button as w, InputNumber as ge, Modal as G, Skeleton as et, Descriptions as de, Steps as tt, Tag as se, Table as Se, Radio as we, Tabs as Ke, Tooltip as st, Card as te, Row as ze, Col as ke, Upload as lt, Tree as at, Menu as it, Result as nt } from "antd";
import { useTranslation as $ } from "react-i18next";
import { useState as b, useEffect as Ce, useMemo as Oe, useCallback as qe } from "react";
import { useRequest as F } from "ahooks";
import { SaveOutlined as Ie, ReloadOutlined as ce, LoadingOutlined as ot, CheckCircleTwoTone as rt, StarFilled as dt, CheckCircleOutlined as We, StarOutlined as ut, EditOutlined as ve, DeleteOutlined as xe, PlusOutlined as Fe, ThunderboltOutlined as ct, ToolOutlined as Ne, SettingOutlined as mt, LockOutlined as ft, FileTextOutlined as pt, EyeOutlined as Ge, UploadOutlined as De, ArrowLeftOutlined as gt, FolderOutlined as Ze, FileOutlined as Je, FileAddOutlined as ht, FolderAddOutlined as xt } from "@ant-design/icons";
import { a as C } from "./index.js";
import { g as $e, a as yt, s as Vt } from "./base.js";
import { f as ee, e as jt, b as Te, m as Qe, M as Xe, L as bt } from "./components.js";
import { useNavigate as _e, useLocation as kt, useParams as Pe, useSearchParams as St } from "react-router-dom";
import { l as vt, c as Ft, u as _t, d as Ct, g as wt, b as It, e as Tt, f as At, r as Et } from "./system.js";
import { c as zt, b as Mt } from "./contexts.js";
import { l as Ot, b as Pt } from "./authorization.js";
const be = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, Rt = {
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
}, Lt = ({ initialData: t, onRefresh: i }) => {
  const { t: s } = $("system"), { t: m } = $("common"), [p] = l.useForm(), [f, k] = b((t == null ? void 0 : t.provider) || "custom"), [v, V] = b((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [n, u] = b((t == null ? void 0 : t.enabled) || !1), [x, L] = b((t == null ? void 0 : t.auto_create_user) || !1), { loading: O, data: A, refresh: j } = F(C.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (_) => {
      p.setFieldsValue(_), k(_.provider), V(_.provider === "custom" || _.provider === "autoDiscover"), u(_.enabled), L(_.auto_create_user);
    },
    onError: (_) => {
      o.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", _);
    }
  });
  Ce(() => {
    t && (p.setFieldsValue(t), k(t.provider), V(t.provider === "custom" || t.provider === "autoDiscover"), u(t.enabled), L(t.auto_create_user));
  }, [t, p]);
  const I = (_) => {
    k(_), V(_ === "custom" || _ === "autoDiscover");
    const r = Rt[_];
    r && p.setFieldsValue({
      auth_endpoint: r.endpoints.auth_endpoint,
      token_endpoint: r.endpoints.token_endpoint,
      userinfo_endpoint: r.endpoints.userinfo_endpoint,
      scope: r.scope,
      // Set field mappings
      email_field: r.email_field,
      username_field: r.username_field,
      full_name_field: r.full_name_field,
      avatar_field: r.avatar_field,
      role_field: r.role_field,
      // Set display configuration
      icon_url: r.icon_url,
      display_name: r.display_name
    });
  }, M = (_) => {
    u(_);
  }, E = (_) => {
    L(_);
  }, { loading: T, run: K } = F(C.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), i ? i() : j();
    },
    onError: (_) => {
      o.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", _);
    }
  }), N = (_) => {
    K(_);
  }, H = () => {
    i ? i() : j();
  }, { loading: J, run: z } = F(async ({ redirect_uri: _, ...r }) => {
    let P;
    return _ ? P = new URL(_) : P = new URL(window.location.origin), P.pathname = $e("/system/settings/oauth/test-callback"), P.searchParams.set("provider", f), C.system.testOauthConnection({ redirect_uri: P.toString(), ...r });
  }, {
    manual: !0,
    onSuccess: ({ url: _ }) => {
      window.open(_, "_blank");
    },
    onError: (_) => {
      o.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: _.message })), console.error("Failed to test OAuth connection", _);
    }
  }), B = () => f === "custom";
  return /* @__PURE__ */ e.jsx(he, { spinning: O, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: p,
      layout: "vertical",
      onFinish: N,
      initialValues: t || A,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(le, { onChange: M })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
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
            children: /* @__PURE__ */ e.jsxs(q, { onChange: I, disabled: !n, children: [
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
          l.Item,
          {
            name: "display_name",
            label: s("settings.oauth.displayName.label", { defaultValue: "Display Name" }),
            tooltip: s("settings.oauth.displayName.tooltip", { defaultValue: "The name displayed on the login button for this provider." }),
            children: /* @__PURE__ */ e.jsx(
              h,
              {
                disabled: !n,
                placeholder: f !== "custom" ? s(`settings.oauth.provider.options.${f}`, { defaultValue: f }) : ""
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
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
          l.Item,
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
          l.Item,
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
        B() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auth_endpoint",
            label: s("settings.oauth.authEndpoint.label", { defaultValue: "Authorization Endpoint" }),
            tooltip: s("settings.oauth.authEndpoint.tooltip", { defaultValue: "The authorization endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && f === "custom",
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
          l.Item,
          {
            name: "wellknown_endpoint",
            hidden: f !== "autoDiscover",
            label: s("settings.oauth.wellknownEndpoint.label", { defaultValue: "Wellknown Endpoint" }),
            tooltip: s("settings.oauth.wellknownEndpoint.tooltip", { defaultValue: "The wellknown endpoint URL of the OAuth provider." }),
            rules: [
              {
                pattern: be,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: n && f === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n })
          }
        ),
        B() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "token_endpoint",
            label: s("settings.oauth.tokenEndpoint.label", { defaultValue: "Token Endpoint" }),
            tooltip: s("settings.oauth.tokenEndpoint.tooltip", { defaultValue: "The token endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && f === "custom",
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
        B() && /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "userinfo_endpoint",
            label: s("settings.oauth.userInfoEndpoint.label", { defaultValue: "User Info Endpoint" }),
            tooltip: s("settings.oauth.userInfoEndpoint.tooltip", { defaultValue: "The user information endpoint URL of the OAuth provider." }),
            rules: [
              {
                required: n && f === "custom",
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
          l.Item,
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
          l.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(_) => _.getFieldValue("redirect_uri") !== "" ? {
              pattern: be,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n, placeholder: `http://${window.location.host}${$e(`/login?provider=settings.${f}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(le, { onChange: E, disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "default_role",
            label: s("settings.oauth.defaultRole.label", { defaultValue: "Default Role" }),
            tooltip: s("settings.oauth.defaultRole.tooltip", { defaultValue: "The default role to assign to new users created via OAuth. Enter role ID." }),
            rules: [
              {
                required: n && x,
                message: s("settings.oauth.defaultRole.required", { defaultValue: "Default Role is required when auto create user is enabled." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(h, { disabled: !n || !x })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
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
          Ue,
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
          l.Item,
          {
            name: "mfa_enabled",
            label: s("settings.oauth.mfaEnabled.label", { defaultValue: "MFA Enabled" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.mfaEnabled.tooltip", { defaultValue: "Enable MFA for OAuth login(Only valid when MFA is enabled by the user)." }),
            children: /* @__PURE__ */ e.jsx(le, { disabled: !n })
          }
        ),
        /* @__PURE__ */ e.jsx(Me, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Ue,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: v ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "email", disabled: !n || !v })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "login", autoComplete: "off", disabled: !n || !v })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "name", disabled: !n || !v })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "avatar_url", disabled: !n || !v })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(h, { placeholder: "role", disabled: !n || !v })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: T,
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              children: m("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              loading: J,
              onClick: async () => {
                const _ = p.getFieldsValue();
                z(_);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: H,
              icon: /* @__PURE__ */ e.jsx(ce, {}),
              children: m("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, Ut = () => {
  const { t } = $("system"), { t: i } = $("common"), [s] = l.useForm(), { loading: m, data: p, refresh: f } = F(C.system.getSecuritySettings, {
    onSuccess: (n) => {
      s.setFieldsValue(n);
    },
    onError: (n) => {
      o.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", n);
    }
  }), { loading: k, run: v } = F(C.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), f();
    },
    onError: (n) => {
      o.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", n);
    }
  }), V = (n) => {
    v(n);
  };
  return /* @__PURE__ */ e.jsx(he, { spinning: m, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: s,
      layout: "vertical",
      onFinish: V,
      initialValues: p,
      children: [
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "mfa_enforced",
            label: t("settings.security.mfa.label", { defaultValue: "Enforce Multi-Factor Authentication (MFA)" }),
            valuePropName: "checked",
            tooltip: t("settings.security.mfa.tooltip", { defaultValue: "If enabled, all users will be required to set up MFA." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
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
          l.Item,
          {
            name: "password_min_length",
            label: t("settings.security.passwordMinLength.label", { defaultValue: "Minimum Password Length" }),
            tooltip: t("settings.security.passwordMinLength.tooltip", { defaultValue: "The minimum number of characters required for a password." }),
            rules: [{ type: "number", min: 6, max: 32 }],
            children: /* @__PURE__ */ e.jsx(ge, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(ge, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, u) => n.login_failure_lock !== u.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(ge, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, u) => n.login_failure_lock !== u.login_failure_lock,
            children: ({ getFieldValue: n }) => n("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(ge, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "history_password_check",
            label: t("settings.security.historyPasswordCheck.label", { defaultValue: "Enforce Password History Policy" }),
            valuePropName: "checked",
            tooltip: t("settings.security.historyPasswordCheck.tooltip", { defaultValue: "Prevent users from reusing recent passwords." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            noStyle: !0,
            shouldUpdate: (n, u) => n.history_password_check !== u.history_password_check,
            children: ({ getFieldValue: n }) => n("history_password_check") ? /* @__PURE__ */ e.jsx(
              l.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(ge, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "inactive_account_lock_days",
            label: t("settings.security.inactiveAccountLock.label", { defaultValue: "Auto-lock Inactive Accounts (Days)" }),
            tooltip: t("settings.security.inactiveAccountLock.tooltip", { defaultValue: "Number of days of inactivity after which user accounts are automatically locked. Set to 0 to disable." }),
            children: /* @__PURE__ */ e.jsx(ge, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ge, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(ge, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: k,
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: () => f(),
              icon: /* @__PURE__ */ e.jsx(ce, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, qt = ({ fetchItems: t, importItems: i, columns: s, ...m }) => {
  const { t: p } = $("system"), [f, k] = b([]), [v, V] = b([]), { run: n, loading: u } = F(t, {
    onError: (O) => {
      o.error(p("settings.ldap.importError", { error: `${O.message}` }));
    },
    onSuccess: (O) => {
      k(O);
    },
    manual: !0
  }), { run: x, loading: L } = F(async () => {
    for (const O of v.filter((A) => {
      const j = f.find((I) => I.ldap_dn === A);
      return !(!j || j.status === "imported");
    })) {
      const A = await i([O]);
      k((j) => [...j].map((M) => {
        for (const E of A)
          if (M.ldap_dn === E.ldap_dn)
            return { ...E, status: "imported" };
        return M;
      }));
    }
  }, {
    manual: !0
  });
  return Ce(() => {
    m.visible && (k([]), n(), V([]));
  }, [m.visible]), /* @__PURE__ */ e.jsx(
    G,
    {
      title: p("settings.ldap.importTitle"),
      ...m,
      onOk: () => {
        x();
      },
      width: 900,
      confirmLoading: L,
      loading: u,
      children: /* @__PURE__ */ e.jsx(
        Se,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (O) => {
              V(O);
            },
            getCheckboxProps: (O) => ({
              disabled: O.status === "imported"
            })
          },
          columns: s.map(({ render: O, ...A }) => O ? {
            ...A,
            render: (j, I, M) => {
              const E = v.includes(I.ldap_dn) && L && I.status !== "imported";
              return O(j, I, M, E);
            }
          } : A),
          dataSource: f,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, Nt = () => {
  var I, M, E;
  const { t } = $("system"), [i] = l.useForm(), [s, m] = b(!1), [p, f] = b(null), [k, v] = b(!1), [V, n] = b(!1), [u] = l.useForm(), [x, L] = b(!1);
  F(C.system.getLdapSettings, {
    onSuccess: (T) => {
      i.setFieldsValue(T), L(T.enabled);
    },
    onError: (T) => {
      o.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${T.message}` }));
    }
  }), Ce(() => {
    f(null);
  }, [k]);
  const O = async (T) => {
    m(!0);
    try {
      await C.system.updateLdapSettings(T), o.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      o.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      m(!1);
    }
  }, { run: A, loading: j } = F(async (T) => {
    const K = await i.validateFields();
    return await C.system.testLdapConnection({
      ...T,
      ...K
    });
  }, {
    onSuccess: (T) => {
      f(T);
    },
    onError: (T) => {
      o.error(t("settings.ldap.testError", { defaultValue: "LDAP connection test failed: {{error}}", error: `${T.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsxs(
      l,
      {
        form: i,
        layout: "vertical",
        onFinish: O,
        initialValues: {
          user_attr: "uid",
          email_attr: "mail",
          display_name_attr: "displayName",
          default_role: "user"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.enabled", { defaultValue: "Enable LDAP Authentication" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { onChange: (T) => L(T) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: x, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: x, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: x, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(h.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: x, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: x, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: x, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: x, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: x, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(h, { type: "number", defaultValue: 15, disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(Me, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(h.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !x })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(ee, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(ee, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              w,
              {
                disabled: !x,
                style: { marginLeft: 8 },
                onClick: () => v(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(ee, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              w,
              {
                disabled: !x,
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
      G,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: k,
        onCancel: () => v(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            l,
            {
              form: u,
              layout: "vertical",
              onFinish: A,
              children: [
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(h, { disabled: !x })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  l.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !x })
                  }
                ),
                /* @__PURE__ */ e.jsxs(l.Item, { children: [
                  /* @__PURE__ */ e.jsx(ee, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(w, { disabled: !x, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    w,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => v(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(he, { spinning: j, children: /* @__PURE__ */ e.jsx(et, { active: j, loading: j, children: p && (p.user ? /* @__PURE__ */ e.jsxs(de, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(de.Item, { label: "Username", span: 3, children: p.user.username }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "Email", span: 3, children: p.user.email }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "FullName", span: 3, children: p.user.full_name }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "CreatedAt", span: 3, children: p.user.created_at }),
            /* @__PURE__ */ e.jsx(de.Item, { label: "UpdatedAt", span: 3, children: p.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            tt,
            {
              direction: "vertical",
              current: (I = p.message) == null ? void 0 : I.findIndex((T) => !T.success),
              status: (M = p.message) != null && M.find((T) => !T.success) ? "error" : "finish",
              items: (E = p.message) == null ? void 0 : E.map((T) => ({
                status: T.success ? "finish" : "error",
                title: T.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      qt,
      {
        visible: V,
        onCancel: () => n(!1),
        fetchItems: () => C.system.importLdapUsers({}),
        importItems: (T) => C.system.importLdapUsers({ user_dn: T }),
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
          render: (T, K, N, H) => H ? /* @__PURE__ */ e.jsx(he, { indicator: /* @__PURE__ */ e.jsx(ot, { spin: !0 }) }) : T ? /* @__PURE__ */ e.jsx(rt, { twoToneColor: "#52c41a" }) : K.id ? /* @__PURE__ */ e.jsx(se, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(se, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, Dt = () => {
  const { t } = $("system"), { t: i } = $("common"), [s] = l.useForm(), [m, p] = b(null), [f, k] = b(!1), [v] = l.useForm(), [V, n] = b(!1), { loading: u } = F(C.system.getSmtpSettings, {
    onSuccess: (j) => {
      s.setFieldsValue(j), n(j.enabled);
    },
    onError: (j) => {
      o.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${j.message}` }));
    }
  });
  Ce(() => {
    p(null);
  }, [f]);
  const { run: x, loading: L } = F(({ port: j, ...I }) => C.system.updateSmtpSettings({ ...I, port: Number(j) }), {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (j) => {
      o.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${j.message}` }));
    }
  }), { run: O, loading: A } = F(async (j) => {
    const { port: I, ...M } = await s.validateFields();
    return await C.system.testSmtpConnection({
      ...j,
      ...M,
      port: Number(I)
    });
  }, {
    onSuccess: (j) => {
      p(j);
    },
    onError: (j) => {
      o.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${j.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(he, { spinning: u, children: /* @__PURE__ */ e.jsxs(
      l,
      {
        form: s,
        layout: "vertical",
        onFinish: x,
        initialValues: {
          port: 587,
          encryption: "STARTTLS"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.enabled", { defaultValue: "Enable SMTP" }),
              name: "enabled",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(le, { onChange: (j) => n(j) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: V, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !V, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: V, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { type: "number", disabled: !V, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: V, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !V, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(h.Password, { disabled: !V, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: V, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(we.Group, { disabled: !V, children: [
                /* @__PURE__ */ e.jsx(we.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(we.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(we.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromAddress", { defaultValue: "From Address" }),
              name: "from_address",
              rules: [
                { required: V, message: t("settings.smtp.fromAddressRequired", { defaultValue: "From Address is required." }) },
                { type: "email", message: t("settings.smtp.fromAddressInvalid", { defaultValue: "Invalid email address." }) }
              ],
              children: /* @__PURE__ */ e.jsx(h, { disabled: !V, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(h, { disabled: !V, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Me, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(Ae, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(Ae, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(Ae, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(l.Item, { children: [
            /* @__PURE__ */ e.jsx(ee, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(w, { type: "primary", htmlType: "submit", loading: L, style: { marginRight: 8 }, children: i("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              w,
              {
                onClick: () => k(!0),
                disabled: !V || A,
                loading: A,
                children: t("settings.smtp.testConnection", { defaultValue: "Test Connection" })
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      G,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: f,
        onCancel: () => k(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => k(!1), children: i("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(w, { type: "primary", loading: A, onClick: () => v.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: v,
            layout: "vertical",
            onFinish: (j) => O(j),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
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
              m && /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: m.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: m.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, $t = () => {
  const { t, i18n: i } = $("system"), { t: s } = $("common"), [m] = l.useForm(), { loading: p, data: f, refresh: k } = F(C.system.getSystemBaseSettings, {
    onSuccess: (u) => {
      m.setFieldsValue(u);
    },
    onError: (u) => {
      o.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", u);
    }
  }), { loading: v, run: V } = F(C.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      o.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), k();
    },
    onError: (u) => {
      o.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", u);
    }
  }), n = (u) => {
    V(u);
  };
  return /* @__PURE__ */ e.jsx(he, { spinning: p, children: /* @__PURE__ */ e.jsxs(
    l,
    {
      form: m,
      layout: "vertical",
      onFinish: n,
      initialValues: f,
      children: [
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(Ke, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", children: /* @__PURE__ */ e.jsx(h, {}) }) })
        }, ...jt.map((u) => ({
          key: u.lang,
          label: i.language !== u.lang ? s(`language.${u.lang}`, { defaultValue: u.label, lang: u.label }) : u.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(l.Item, { name: ["name_i18n", u.lang], children: /* @__PURE__ */ e.jsx(h, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(h, {}) }),
        /* @__PURE__ */ e.jsx(l.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(h, {}) }),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          l.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(le, {})
          }
        ),
        /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              type: "primary",
              htmlType: "submit",
              loading: v,
              icon: /* @__PURE__ */ e.jsx(Ie, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            w,
            {
              onClick: () => k(),
              icon: /* @__PURE__ */ e.jsx(ce, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: Bt } = h, Ht = () => {
  var Q;
  const { t } = $("ai"), { t: i } = $("common"), [s] = l.useForm(), [m, p] = b(!1), [f, k] = b(null), [v, V] = b(""), [n, u] = b(""), [x, L] = b({}), { loading: O, data: A } = F(
    () => C.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (c) => {
        o.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", c);
      }
    }
  ), j = Oe(() => A == null ? void 0 : A.find((c) => c.provider === n), [A, n]), { loading: I, data: M, refresh: E } = F(
    () => C.ai.listAiModels({ current: 1, page_size: 100, search: v }),
    {
      refreshDeps: [v],
      onError: (c) => {
        o.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", c);
      }
    }
  ), { loading: T, run: K } = F(
    ({ config: c, ...d }) => C.ai.createAiModel({ config: c ?? {}, ...d }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), p(!1), s.resetFields(), E();
      },
      onError: (c) => {
        o.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", c);
      }
    }
  ), { loading: N, run: H } = F(
    ({ id: c, data: d }) => C.ai.updateAiModel({ id: c }, d),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), p(!1), s.resetFields(), k(null), E();
      },
      onError: (c) => {
        o.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", c);
      }
    }
  ), { runAsync: J } = F(
    (c) => C.ai.deleteAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), E();
      },
      onError: (c) => {
        o.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", c);
      }
    }
  ), { runAsync: z } = F(
    (c) => C.ai.testAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (c) => {
        o.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", c);
      }
    }
  ), { runAsync: B } = F(
    (c) => C.ai.setDefaultAiModel({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), E();
      },
      onError: (c) => {
        o.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", c);
      }
    }
  ), _ = () => {
    k(null), u(""), L({}), s.resetFields(), p(!0);
  }, r = (c) => {
    k(c), u(c.provider);
    const d = c.config || {}, D = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      is_default: c.is_default,
      config: d,
      // Spread config fields to form
      status: c.status
    };
    console.log(D), L(D), s.setFieldsValue(D), p(!0);
  }, P = (c) => {
    u(c), j != null && j.config_fields && j.config_fields.forEach((d) => {
      s.setFieldValue(d.name, void 0);
    });
  }, ae = (c) => {
    const d = {};
    j != null && j.config_fields && j.config_fields.forEach((X) => {
      var oe;
      const ne = (oe = c.config) == null ? void 0 : oe[X.name];
      ne != null && ne !== "" && (d[X.name] = ne);
    });
    const D = {
      name: c.name,
      description: c.description,
      provider: c.provider,
      config: d,
      is_default: c.is_default,
      status: c.status
    };
    f ? H({ id: f.id, data: D }) : K(D);
  }, ie = (c) => {
    var D;
    if (!((D = c.data_source) != null && D.depends_on))
      return {};
    const d = {};
    return c.data_source.depends_on.forEach((X) => {
      d[X] = x[X];
    }), d;
  }, ue = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (c, d) => /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx("span", { children: c }),
        d.is_default && /* @__PURE__ */ e.jsx(st, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(dt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (c) => /* @__PURE__ */ e.jsx(se, { color: "blue", children: c.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (c) => /* @__PURE__ */ e.jsx(se, { color: c === "enabled" ? "green" : "red", children: c === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (c, d) => /* @__PURE__ */ e.jsx(Te, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(We, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => z(d.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(ut, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => B(d.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          tooltip: i("edit", { defaultValue: "Edit" }),
          onClick: async () => r(d)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(xe, {}),
          tooltip: i("delete", { defaultValue: "Delete" }),
          onClick: async () => J(d.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ze, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsx(
        h.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: v,
          onChange: (c) => V(c.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ce, {}),
            onClick: E,
            loading: I,
            children: i("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ee, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Fe, {}),
            onClick: _,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(
      Se,
      {
        columns: ue,
        dataSource: (M == null ? void 0 : M.data) || [],
        loading: I,
        rowKey: "id",
        pagination: {
          total: (M == null ? void 0 : M.total) || 0,
          current: (M == null ? void 0 : M.current) || 1,
          pageSize: (M == null ? void 0 : M.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (c, d) => t("common.pagination.total", {
            defaultValue: `${d[0]}-${d[1]} of ${c} items`,
            start: d[0],
            end: d[1],
            total: c
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      G,
      {
        title: f ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: m,
        onCancel: () => {
          p(!1), s.resetFields(), k(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: ae,
            onValuesChange: (c, d) => L(d),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Bt,
                    {
                      rows: 3,
                      placeholder: t("models.descriptionPlaceholder", { defaultValue: "Enter model description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "provider",
                  label: t("models.provider", { defaultValue: "Provider" }),
                  rules: [{ required: !0, message: t("models.providerRequired", { defaultValue: "Please select provider" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    q,
                    {
                      loading: O,
                      placeholder: t("models.providerPlaceholder", { defaultValue: "Select provider" }),
                      onChange: P,
                      value: n,
                      options: A == null ? void 0 : A.map((c) => ({
                        label: c.name,
                        value: c.provider
                      }))
                    }
                  )
                }
              ),
              (Q = j == null ? void 0 : j.config_fields) == null ? void 0 : Q.map((c) => /* @__PURE__ */ e.jsx(
                Qe,
                {
                  field: c,
                  selectedType: n,
                  dependentValues: ie(c),
                  formValues: x
                },
                c.name
              )),
              /* @__PURE__ */ e.jsxs(
                l.Item,
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
              /* @__PURE__ */ e.jsx(l.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: T || N,
                    children: f ? i("update", { defaultValue: "Update" }) : i("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    onClick: () => {
                      p(!1), s.resetFields(), k(null), u(""), L({});
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
}, { TextArea: Kt } = h, Wt = () => {
  var S;
  const { t } = $("system"), { t: i } = $("common"), [s] = l.useForm(), [m, p] = b(!1), [f, k] = b(null), [v, V] = b(""), [n, u] = b(!1), [x, L] = b(null), [O, A] = b(""), [j, I] = b(!1), [M, E] = b([]), [T, K] = b({}), [N, H] = b(), { loading: J, data: z, refresh: B } = F(
    () => C.system.listToolSets({ current: 1, page_size: 100, search: v, type: N }),
    {
      refreshDeps: [v, N],
      onError: (a) => {
        o.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", a);
      }
    }
  ), { loading: _, data: r } = F(
    () => C.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (a) => {
        o.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", a);
      }
    }
  ), P = Oe(() => r == null ? void 0 : r.find((a) => a.tool_set_type === O), [r, O]), { loading: ae, run: ie } = F(
    (a) => C.system.createToolSet({
      ...a,
      type: a.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), p(!1), s.resetFields(), B();
      },
      onError: (a) => {
        o.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", a);
      }
    }
  ), { loading: ue, run: Q } = F(
    ({ id: a, data: g }) => C.system.updateToolSet({ id: a }, {
      ...g,
      type: g.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), p(!1), s.resetFields(), k(null), B();
      },
      onError: (a) => {
        o.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", a);
      }
    }
  ), { run: c } = F(
    (a) => C.system.deleteToolSet({ id: a }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), B();
      },
      onError: (a) => {
        o.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", a);
      }
    }
  ), { runAsync: d } = F(
    (a) => C.system.testToolSet({ id: a }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (a) => {
        o.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", a);
      }
    }
  ), { loading: D, runAsync: X } = F(
    (a) => C.system.getToolSetTools({ id: a }),
    {
      manual: !0,
      onSuccess: (a) => {
        E(a || []), I(!0);
      },
      onError: (a) => {
        o.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", a);
      }
    }
  ), { runAsync: ne } = F(
    ({ id: a, status: g }) => C.system.updateToolSetStatus({ id: a }, { status: g }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), B();
      },
      onError: (a) => {
        o.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", a);
      }
    }
  ), oe = () => {
    k(null), s.resetFields(), A(""), p(!0);
  }, me = (a) => {
    k(a), A(a.type);
    const g = { ...a };
    if (g.config) {
      const R = r == null ? void 0 : r.find((U) => U.tool_set_type === a.type);
      if (R) {
        const U = {};
        R.config_fields.forEach((Y) => {
          var je, Re;
          Y.type === "object" && ((je = g.config) != null && je[Y.name]) ? U[Y.name] = JSON.stringify(g.config[Y.name], null, 2) : ((Re = g.config) == null ? void 0 : Re[Y.name]) !== void 0 && (U[Y.name] = g.config[Y.name]);
        }), g.config = U;
      }
    }
    s.setFieldsValue(g), p(!0);
  };
  console.log(O, r);
  const fe = (a) => {
    A(a);
    const g = r == null ? void 0 : r.find((R) => R.tool_set_type === a);
    if (g) {
      const R = {};
      g.config_fields.forEach((U) => {
        if (U.default)
          switch (U.type) {
            case "number":
              R[U.name] = Number(U.default);
              break;
            case "boolean":
              R[U.name] = U.default === "true";
              break;
            case "array":
              R[U.name] = U.default.split(",");
              break;
            default:
              R[U.name] = U.default;
          }
      }), s.setFieldValue("config", R);
    } else
      s.setFieldValue("config", void 0);
  }, ye = (a) => {
    if (a.config && P) {
      const g = {};
      P.config_fields.forEach((R) => {
        var Y;
        const U = (Y = a.config) == null ? void 0 : Y[R.name];
        if (U !== void 0)
          if (R.type === "object")
            try {
              g[R.name] = typeof U == "string" ? JSON.parse(U) : U;
            } catch {
              g[R.name] = U;
            }
          else
            g[R.name] = U;
      }), a.config = g;
    }
    f ? Q({ id: f.id, data: a }) : ie(a);
  }, pe = (a) => {
    c(a);
  }, y = (a) => {
    L(a), u(!0);
  }, W = (a) => {
    console.log(/* @__PURE__ */ new Date(), "handleToggleStatus");
    const g = a.status === "enabled" ? "disabled" : "enabled";
    return ne({ id: a.id, status: g }).then(() => {
      console.log(/* @__PURE__ */ new Date(), "handleToggleStatus1");
    });
  }, re = (a) => {
    var R;
    if (!((R = a.data_source) != null && R.depends_on) || a.data_source.depends_on.length === 0)
      return {};
    const g = {};
    return a.data_source.depends_on.forEach((U) => {
      var je;
      const Y = (je = T.config) == null ? void 0 : je[U];
      Y !== void 0 && (g[U] = Y);
    }), g;
  };
  console.log(z);
  const Ve = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (a) => /* @__PURE__ */ e.jsx(se, { color: "blue", children: a.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (a) => /* @__PURE__ */ e.jsx(se, { color: a === "enabled" ? "green" : "red", children: a === "enabled" ? t("common.enabled", { defaultValue: "Enabled" }) : t("common.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (a, g) => /* @__PURE__ */ e.jsx(Te, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(ct, {}),
          disabled: g.status !== "enabled",
          onClick: async () => d(g.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ne, {}),
          permission: "system:toolsets:view",
          disabled: g.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => X(g.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(mt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => y(g.config),
          disabled: !g.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(ve, {}),
          onClick: async () => me(g)
        },
        {
          key: "toggleStatus",
          icon: g.status === "enabled" ? /* @__PURE__ */ e.jsx(ft, {}) : /* @__PURE__ */ e.jsx(We, {}),
          onClick: async () => W(g),
          permission: "system:toolsets:update",
          tooltip: g.status === "enabled" ? i("disable", { defaultValue: "Disable" }) : i("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(xe, {}),
          permission: "system:toolsets:delete",
          tooltip: i("delete", { defaultValue: "Delete" }),
          onClick: async () => pe(g.id),
          danger: !0,
          confirm: {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => pe(g.id),
            okText: i("confirm", { defaultValue: "Confirm" }),
            cancelText: i("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(te, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(ze, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          h.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            value: v,
            onChange: (a) => V(a.target.value),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          q,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: N,
            onChange: (a) => H(a),
            options: r == null ? void 0 : r.map((a) => ({
              label: a.name,
              value: a.tool_set_type
            })),
            style: { minWidth: 110 },
            allowClear: !0,
            children: [
              /* @__PURE__ */ e.jsx(q.Option, { value: "", children: "All" }),
              r == null ? void 0 : r.map((a) => /* @__PURE__ */ e.jsx(q.Option, { value: a.tool_set_type, children: a.name }, a.tool_set_type))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(ke, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(ce, {}),
            onClick: B,
            loading: J,
            children: i("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(ee, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          w,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Fe, {}),
            onClick: oe,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(te, { children: /* @__PURE__ */ e.jsx(
      Se,
      {
        columns: Ve,
        dataSource: (z == null ? void 0 : z.data) || [],
        loading: J,
        rowKey: "id",
        pagination: {
          total: (z == null ? void 0 : z.total) || 0,
          current: (z == null ? void 0 : z.current) || 1,
          pageSize: (z == null ? void 0 : z.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (a, g) => t("common.pagination.total", {
            defaultValue: `${g[0]}-${g[1]} of ${a} items`,
            start: g[0],
            end: g[1],
            total: a
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      G,
      {
        title: f ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: m,
        onCancel: () => {
          p(!1), s.resetFields(), k(null), A("");
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          l,
          {
            form: s,
            layout: "vertical",
            onFinish: ye,
            onValuesChange: (a, g) => K(g),
            children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    Kt,
                    {
                      rows: 3,
                      placeholder: t("settings.toolsets.descriptionPlaceholder", { defaultValue: "Enter toolset description" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "type",
                  label: t("settings.toolsets.type", { defaultValue: "Type" }),
                  rules: [{ required: !0, message: t("settings.toolsets.typeRequired", { defaultValue: "Please select type" }) }],
                  children: /* @__PURE__ */ e.jsx(
                    q,
                    {
                      loading: _,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: fe,
                      value: O,
                      options: r == null ? void 0 : r.map((a) => ({
                        label: a.name,
                        value: a.tool_set_type
                      }))
                    }
                  )
                }
              ),
              (S = P == null ? void 0 : P.config_fields) == null ? void 0 : S.map((a) => /* @__PURE__ */ e.jsx(
                Qe,
                {
                  field: a,
                  selectedType: O,
                  dependentValues: re(a),
                  formValues: T
                },
                a.name
              )),
              /* @__PURE__ */ e.jsx(l.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(l.Item, { children: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: ae || ue,
                    children: f ? i("update", { defaultValue: "Update" }) : i("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  w,
                  {
                    onClick: () => {
                      p(!1), s.resetFields(), k(null), A("");
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
      G,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: n,
        onCancel: () => u(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => u(!1), children: i("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(x, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      G,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: j,
        onCancel: () => I(!1),
        footer: [
          /* @__PURE__ */ e.jsx(w, { onClick: () => I(!1), children: i("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: D ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(ce, { style: { fontSize: 24 }, spin: !0 }) }) : M.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : M.map((a, g) => {
          var R, U, Y;
          return /* @__PURE__ */ e.jsx(
            te,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(Z, { children: [
                /* @__PURE__ */ e.jsx(Ne, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((R = a.function) == null ? void 0 : R.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(ze, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(ke, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((U = a.function) == null ? void 0 : U.description) || "-" })
                ] }),
                ((Y = a.function) == null ? void 0 : Y.parameters) && /* @__PURE__ */ e.jsxs(ke, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(a.function.parameters, null, 2) })
                ] })
              ] })
            },
            g
          );
        }) })
      }
    )
  ] });
}, { TextArea: Be } = h, Gt = () => {
  const { t } = $("system"), { t: i } = $("common"), s = _e(), [m] = l.useForm(), [p, f] = b(""), [k, v] = b(), [V, n] = b(!1), [u, x] = b(null), [L, O] = b(!1), [A] = l.useForm(), { loading: j, data: I, refresh: M } = F(
    () => C.system.listSkills({
      current: 1,
      page_size: 100,
      search: p || void 0,
      domain: k
    }),
    {
      refreshDeps: [p, k],
      onError: () => {
        o.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: E } = F(() => C.system.listSkillDomains()), T = E ?? [], K = (I == null ? void 0 : I.data) ?? [], N = (I == null ? void 0 : I.total) ?? 0, { loading: H, run: J } = F(
    (d) => C.system.createSkill(d),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" })), n(!1), m.resetFields(), M();
      },
      onError: () => {
        o.error(t("settings.skills.createFailed", { defaultValue: "Failed to create skill" }));
      }
    }
  ), { loading: z, run: B } = F(
    ({ id: d, body: D }) => C.system.updateSkill({ id: d }, D),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" })), n(!1), x(null), m.resetFields(), M();
      },
      onError: () => {
        o.error(t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }));
      }
    }
  ), { run: _ } = F(
    (d) => C.system.deleteSkill({ id: d }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), M();
      },
      onError: () => {
        o.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), { loading: r, run: P } = F(
    (d) => C.system.uploadSkill(d.body, d.file),
    {
      manual: !0,
      onSuccess: () => {
        o.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), O(!1), A.resetFields(), M();
      },
      onError: () => {
        o.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), ae = () => {
    x(null), m.resetFields(), n(!0);
  }, ie = (d) => {
    x(d), m.setFieldsValue({
      name: d.name,
      description: d.description,
      category: d.category,
      domain: d.domain
    }), n(!0);
  }, ue = () => {
    m.validateFields().then((d) => {
      u ? B({
        id: u.id,
        body: {
          name: d.name,
          description: d.description ?? "",
          category: d.category ?? "",
          domain: d.domain ?? ""
        }
      }) : J({
        name: d.name,
        description: d.description ?? "",
        category: d.category ?? "",
        domain: d.domain ?? "",
        content: d.content ?? ""
      });
    });
  }, Q = () => {
    var oe, me;
    const d = (oe = A.getFieldValue("file")) == null ? void 0 : oe.fileList, D = ((me = d == null ? void 0 : d[0]) == null ? void 0 : me.originFileObj) ?? (d == null ? void 0 : d[0]);
    if (!D) {
      o.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const X = A.getFieldValue("category"), ne = A.getFieldValue("domain");
    P({ body: { category: X, domain: ne }, file: D });
  }, c = [
    { title: t("settings.skills.name", { defaultValue: "Name" }), dataIndex: "name", key: "name" },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (d) => d ? /* @__PURE__ */ e.jsx(se, { children: d }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (d) => d ? /* @__PURE__ */ e.jsx(se, { color: "blue", children: d }) : "-" },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (d, D) => /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(ee, { permission: "system:skills:edit_files", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(pt, {}), onClick: () => s(`/system/settings/skills/${D.id}/edit`), children: t("settings.skills.editFiles", { defaultValue: "Edit files" }) }) }),
        /* @__PURE__ */ e.jsx(ee, { permission: "system:skills:view", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(Ge, {}), onClick: () => s(`/system/settings/skills/${D.id}/preview`), children: i("preview", { defaultValue: "Preview" }) }) }),
        /* @__PURE__ */ e.jsx(ee, { permission: "system:skills:update", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", icon: /* @__PURE__ */ e.jsx(ve, {}), onClick: () => ie(D), children: i("edit", { defaultValue: "Edit" }) }) }),
        /* @__PURE__ */ e.jsx(ee, { permission: "system:skills:delete", children: /* @__PURE__ */ e.jsx(w, { type: "link", size: "small", danger: !0, icon: /* @__PURE__ */ e.jsx(xe, {}), onClick: () => G.confirm({ title: i("confirmDelete", { defaultValue: "Confirm delete?" }), onOk: () => _(D.id) }), children: i("delete", { defaultValue: "Delete" }) }) })
      ] })
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    te,
    {
      title: t("settings.skills.title", { defaultValue: "AI Agent Skills" }),
      extra: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(
          h.Search,
          {
            placeholder: i("search", { defaultValue: "Search" }),
            allowClear: !0,
            onSearch: f,
            style: { width: 200 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          q,
          {
            placeholder: t("settings.skills.domain", { defaultValue: "Domain" }),
            allowClear: !0,
            style: { width: 120 },
            value: k,
            onChange: v,
            options: T.map((d) => ({ value: d, label: d }))
          }
        ),
        /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(ce, {}), onClick: () => M(), children: i("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ee, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: ae, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(ee, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(De, {}), onClick: () => O(!0), children: t("settings.skills.upload", { defaultValue: "Upload" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsx(
          Se,
          {
            rowKey: "id",
            loading: j,
            columns: c,
            dataSource: K,
            pagination: { total: N, pageSize: 10, showSizeChanger: !0 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          G,
          {
            title: u ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
            open: V,
            onOk: ue,
            onCancel: () => {
              n(!1), x(null);
            },
            confirmLoading: H || z,
            width: 560,
            children: /* @__PURE__ */ e.jsxs(l, { form: m, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(l.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(l.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(Be, { rows: 2 }) }),
              /* @__PURE__ */ e.jsx(l.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(l.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: i("optional", { defaultValue: "Optional" }), options: T.map((d) => ({ value: d, label: d })) }) }),
              !u && /* @__PURE__ */ e.jsx(l.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(Be, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) })
            ] })
          }
        ),
        /* @__PURE__ */ e.jsx(
          G,
          {
            title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
            open: L,
            onOk: Q,
            onCancel: () => O(!1),
            confirmLoading: r,
            children: /* @__PURE__ */ e.jsxs(l, { form: A, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(l.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(lt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(De, {}), children: i("selectFile", { defaultValue: "Select file" }) }) }) }),
              /* @__PURE__ */ e.jsx(l.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(h, {}) }),
              /* @__PURE__ */ e.jsx(l.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(q, { allowClear: !0, placeholder: i("optional", { defaultValue: "Optional" }), options: T.map((d) => ({ value: d, label: d })) }) })
            ] })
          }
        )
      ]
    }
  );
}, { TextArea: Zt } = h, Jt = () => {
  const t = _e(), { t: i } = $("system"), { t: s } = $("common"), [m] = l.useForm(), [p, f] = b(!1), [k, v] = b(null), [V, n] = b(""), [u, x] = b(1), [L, O] = b(10), { loading: A, data: j, refresh: I } = F(
    () => vt({ current: u, page_size: L, search: V }),
    {
      refreshDeps: [u, L, V],
      onError: (r) => {
        o.error(i("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", r);
      }
    }
  ), { loading: M, run: E } = F(
    (r) => Ft(r),
    {
      manual: !0,
      onSuccess: () => {
        o.success(i("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), f(!1), m.resetFields(), v(null), I();
      },
      onError: (r) => {
        o.error((r == null ? void 0 : r.err) || i("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: T, run: K } = F(
    ({ id: r, ...P }) => _t({ id: r }, P),
    {
      manual: !0,
      onSuccess: () => {
        o.success(i("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), f(!1), m.resetFields(), v(null), I();
      },
      onError: (r) => {
        o.error((r == null ? void 0 : r.err) || i("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: N } = F(
    (r) => Ct({ id: r }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(i("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), I();
      },
      onError: (r) => {
        o.error((r == null ? void 0 : r.err) || i("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), H = () => {
    v(null), m.resetFields(), m.setFieldsValue({ status: "active" }), f(!0);
  }, J = (r) => {
    v(r), m.setFieldsValue({
      name: r.name,
      description: r.description,
      status: r.status
    }), f(!0);
  }, z = (r) => {
    G.confirm({
      title: i("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: i("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${r.name}"? This action cannot be undone.`
      }),
      onOk: () => N(r.id)
    });
  }, B = () => {
    m.validateFields().then((r) => {
      k ? K({ id: k.id, ...r }) : E(r);
    });
  }, _ = [
    {
      title: i("settings.organizations.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name"
    },
    {
      title: i("settings.organizations.description", { defaultValue: "Description" }),
      dataIndex: "description",
      key: "description"
    },
    {
      title: i("settings.organizations.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (r) => /* @__PURE__ */ e.jsx(se, { color: r === "active" ? "green" : "default", children: r === "active" ? i("settings.organizations.active", { defaultValue: "Active" }) : i("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (r, P) => /* @__PURE__ */ e.jsx(
        Te,
        {
          actions: [
            {
              key: "view",
              label: s("view", { defaultValue: "View" }),
              icon: /* @__PURE__ */ e.jsx(Ge, {}),
              onClick: async () => t(`/system/settings/organizations/${P.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              label: s("edit", { defaultValue: "Edit" }),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: async () => J(P),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              label: s("delete", { defaultValue: "Delete" }),
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              danger: !0,
              onClick: async () => z(P),
              permission: "system:organization:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    te,
    {
      title: i("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(Z, { children: [
        /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(ce, {}), onClick: I, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(ee, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: H, children: i("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            h.Search,
            {
              placeholder: i("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (r) => {
                n(r), x(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Se,
            {
              columns: _,
              dataSource: (j == null ? void 0 : j.data) || [],
              loading: A,
              rowKey: "id",
              pagination: {
                current: u,
                pageSize: L,
                total: (j == null ? void 0 : j.total) || 0,
                showSizeChanger: !0,
                showTotal: (r, P) => i("common.pagination.total", {
                  defaultValue: `${P[0]}-${P[1]} of ${r} items`,
                  start: P[0],
                  end: P[1],
                  total: r
                }),
                onChange: (r, P) => {
                  x(r), O(P);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          G,
          {
            title: k ? i("settings.organizations.edit", { defaultValue: "Edit Organization" }) : i("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: p,
            onOk: B,
            onCancel: () => {
              f(!1), m.resetFields(), v(null);
            },
            confirmLoading: M || T,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(l, { form: m, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "name",
                  label: i("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: i("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(h, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "description",
                  label: i("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Zt, { rows: 3 })
                }
              ),
              /* @__PURE__ */ e.jsx(
                l.Item,
                {
                  name: "status",
                  label: i("settings.organizations.status", { defaultValue: "Status" }),
                  rules: [{ required: !0 }],
                  children: /* @__PURE__ */ e.jsxs(q, { children: [
                    /* @__PURE__ */ e.jsx(q.Option, { value: "active", children: i("settings.organizations.active", { defaultValue: "Active" }) }),
                    /* @__PURE__ */ e.jsx(q.Option, { value: "disabled", children: i("settings.organizations.disabled", { defaultValue: "Disabled" }) })
                  ] })
                }
              )
            ] })
          }
        )
      ]
    }
  );
}, Qt = ({
  transformItems: t = (i) => i
}) => {
  const { t: i } = $("system"), s = _e(), m = kt(), k = m.hash.replace("#", "") || "base", { enableMultiOrg: v } = zt(), { hasPermission: V } = Mt(), n = [
    {
      key: "base",
      label: i("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx($t, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "security",
      label: i("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(Ut, {}),
      hidden: !V("system:security:update")
    },
    {
      key: "oauth",
      label: i("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(Lt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "ldap",
      label: i("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(Nt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "smtp",
      label: i("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(Dt, {}),
      hidden: !V("system:settings:update")
    },
    {
      key: "ai-models",
      label: i("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(Ht, {}),
      hidden: !V("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: i("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Wt, {}),
      hidden: !V("system:toolsets:view")
    },
    {
      key: "skills",
      label: i("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(Gt, {}),
      hidden: !V("system:skills:view")
    },
    // Only show organization tab if multi-org is enabled
    ...v ? [{
      key: "organizations",
      label: i("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Jt, {}),
      hidden: !V("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(te, { title: i("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    Ke,
    {
      defaultActiveKey: k,
      onChange: (u) => {
        s(`${m.pathname}#${u}`);
      },
      items: t(n.filter((u) => !u.hidden), i)
    }
  ) });
}, hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qt
}, Symbol.toStringTag, { value: "Module" })), Xt = () => {
  var fe, ye, pe;
  const t = _e(), { id: i } = Pe(), { t: s } = $("system"), { t: m } = $("common"), [p] = l.useForm(), [f] = l.useForm(), [k, v] = b(!1), [V, n] = b(!1), [u, x] = b(null), [L, O] = b(""), [A, j] = b(1), [I, M] = b(10), { data: E, loading: T, refresh: K } = F(
    () => wt({ id: i }),
    {
      ready: !!i,
      onError: (y) => {
        o.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", y);
      }
    }
  ), { data: N, loading: H, refresh: J } = F(
    () => It({ id: i, current: A, page_size: I, search: L }),
    {
      ready: !!i,
      refreshDeps: [i, A, I, L],
      onError: (y) => {
        o.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", y);
      }
    }
  ), { data: z, loading: B } = F(
    () => Ot({ current: 1, page_size: 1e3 }),
    {
      ready: k
    }
  ), { data: _, loading: r } = F(
    () => Pt({ organization_id: i, current: 1, page_size: 1e3 }),
    {
      ready: !!i
    }
  ), { loading: P, run: ae } = F(
    (y) => Tt({ id: i }, y),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), v(!1), p.resetFields(), J();
      },
      onError: (y) => {
        o.error((y == null ? void 0 : y.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: ie, run: ue } = F(
    (y) => At({ id: i, user_id: u == null ? void 0 : u.id }, y),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), n(!1), f.resetFields(), x(null), J();
      },
      onError: (y) => {
        o.error((y == null ? void 0 : y.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: Q } = F(
    (y) => Et({ id: i, user_id: y }),
    {
      manual: !0,
      onSuccess: () => {
        o.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), J();
      },
      onError: (y) => {
        o.error((y == null ? void 0 : y.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), c = () => {
    v(!0), p.resetFields();
  }, d = (y) => {
    var W;
    x(y), f.setFieldsValue({
      role_ids: ((W = y.organization_roles) == null ? void 0 : W.map((re) => re.id)) || []
    }), n(!0);
  }, D = (y) => {
    G.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${y.full_name || y.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => Q(y.id)
    });
  }, X = () => {
    p.validateFields().then((y) => {
      ae(y);
    });
  }, ne = () => {
    f.validateFields().then((y) => {
      ue(y);
    });
  }, oe = ((fe = z == null ? void 0 : z.data) == null ? void 0 : fe.filter((y) => {
    var W;
    return !((W = N == null ? void 0 : N.data) != null && W.some((re) => re.id === y.id));
  })) || [], me = [
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
      render: (y) => /* @__PURE__ */ e.jsx(se, { color: y === "active" ? "green" : "default", children: y === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : y })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (y, W) => {
        var re;
        return /* @__PURE__ */ e.jsx(Z, { wrap: !0, children: ((re = W.organization_roles) == null ? void 0 : re.map((Ve) => /* @__PURE__ */ e.jsx(se, { children: Ve.name }, Ve.id))) || /* @__PURE__ */ e.jsx(se, { children: "No roles" }) });
      }
    },
    {
      title: m("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (y, W) => /* @__PURE__ */ e.jsx(
        Te,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(ve, {}),
              onClick: async () => d(W)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              danger: !0,
              onClick: async () => D(W)
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: /* @__PURE__ */ e.jsxs(Z, { children: [
          /* @__PURE__ */ e.jsx(
            w,
            {
              icon: /* @__PURE__ */ e.jsx(gt, {}),
              onClick: () => t("/system/settings#organizations"),
              children: m("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            E == null ? void 0 : E.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(w, { icon: /* @__PURE__ */ e.jsx(ce, {}), onClick: () => {
          K(), J();
        }, children: m("refresh", { defaultValue: "Refresh" }) }),
        loading: T,
        children: /* @__PURE__ */ e.jsxs(de, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(de.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: E == null ? void 0 : E.name }),
          /* @__PURE__ */ e.jsx(de.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(se, { color: (E == null ? void 0 : E.status) === "active" ? "green" : "default", children: (E == null ? void 0 : E.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(de.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (E == null ? void 0 : E.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: c, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(Z, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            h.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (y) => {
                O(y), j(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            Se,
            {
              columns: me,
              dataSource: (N == null ? void 0 : N.data) || [],
              loading: H,
              rowKey: "id",
              pagination: {
                current: A,
                pageSize: I,
                total: (N == null ? void 0 : N.total) || 0,
                showSizeChanger: !0,
                showTotal: (y) => m("pagination.total", { defaultValue: `Total ${y} items` }),
                onChange: (y, W) => {
                  j(y), M(W);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      G,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: k,
        onOk: X,
        onCancel: () => {
          v(!1), p.resetFields();
        },
        confirmLoading: P,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: p, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "user_id",
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              rules: [{ required: !0, message: s("settings.organizations.users.userRequired", { defaultValue: "Please select a user" }) }],
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  showSearch: !0,
                  placeholder: s("settings.organizations.users.selectUser", { defaultValue: "Select a user" }),
                  loading: B,
                  filterOption: (y, W) => ((W == null ? void 0 : W.label) ?? "").toLowerCase().includes(y.toLowerCase()),
                  options: oe.map((y) => ({
                    label: `${y.full_name || y.username} (${y.email})`,
                    value: y.id
                  }))
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: r,
                  options: ((ye = _ == null ? void 0 : _.data) == null ? void 0 : ye.map((y) => ({
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
      G,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: V,
        onOk: ne,
        onCancel: () => {
          n(!1), f.resetFields(), x(null);
        },
        confirmLoading: ie,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(l, { form: f, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                h,
                {
                  value: (u == null ? void 0 : u.full_name) || (u == null ? void 0 : u.username),
                  disabled: !0
                }
              )
            }
          ),
          /* @__PURE__ */ e.jsx(
            l.Item,
            {
              name: "role_ids",
              label: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
              children: /* @__PURE__ */ e.jsx(
                q,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles" }),
                  loading: r,
                  options: ((pe = _ == null ? void 0 : _.data) == null ? void 0 : pe.map((y) => ({
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
}, xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xt
}, Symbol.toStringTag, { value: "Module" })), { TextArea: He } = h, Yt = (t) => t.toLowerCase().endsWith(".md");
function Ye(t) {
  return t.map((i) => {
    var s;
    return {
      key: i.path,
      title: i.name,
      isLeaf: !i.is_dir,
      icon: i.is_dir ? /* @__PURE__ */ e.jsx(Ze, {}) : /* @__PURE__ */ e.jsx(Je, {}),
      children: (s = i.children) != null && s.length ? Ye(i.children) : void 0
    };
  });
}
function Ee(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const es = () => {
  const { id: t } = Pe(), i = _e(), { t: s } = $("system"), [m, p] = b(null), [f, k] = b(null), [v, V] = b(!1), [n, u] = b(""), [x, L] = b(!1), [O, A] = b([]), [j, I] = b(!1), [M, E] = b(!1), [T, K] = b(""), [N] = l.useForm(), [H, J] = b(null), [z, B] = b(null), [_, r] = b(""), [P] = l.useForm(), { data: ae } = F(
    () => t ? C.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: ie, loading: ue, refresh: Q } = F(
    () => t ? C.system.listSkillFilesTree({ id: t }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [t],
      ready: !!t,
      onSuccess: (S) => {
        if (!m) {
          for (const a of S)
            if (!a.is_dir && a.name === "SKILL.md") {
              k(a.path), p(a.path), V(!1);
              return;
            }
          for (const a of S)
            if (!a.is_dir && a.name === "SKILLS.md") {
              k(a.path), p(a.path), V(!1);
              return;
            }
        }
      }
    }
  ), c = (ae == null ? void 0 : ae.data) ?? ae, d = (ie == null ? void 0 : ie.data) ?? ie ?? [], D = Oe(() => Ye(d), [d]), X = v && f ? f : m ? Ee(m) : "";
  Ce(() => {
    m && t ? (C.system.getSkillFile({ id: t, path: m }).then((S) => u((S == null ? void 0 : S.data) ?? S ?? "")).catch(() => o.error(s("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), L(!1)) : (u(""), L(!1));
  }, [t, m, s]);
  const ne = () => {
    !t || !m || C.system.putSkillFile({ id: t, path: m }, n).then(() => {
      o.success(s("settings.skills.editor.saved", { defaultValue: "Saved" })), L(!1);
    }).catch(() => o.error(s("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, oe = (S, a) => {
    const g = String(a.node.key), R = !a.node.isLeaf;
    k(g), V(R), a.node.isLeaf ? p(g) : p(null);
  }, me = (S) => {
    S.event.preventDefault(), J({
      path: String(S.node.key),
      isDir: !S.node.isLeaf,
      x: S.event.clientX,
      y: S.event.clientY
    });
  }, fe = qe(() => J(null), []), ye = qe(
    (S) => {
      if (!t || !H) return;
      const { path: a, isDir: g } = H;
      switch (fe(), S) {
        case "open":
          p(a), k(a), V(!1);
          break;
        case "rename": {
          const R = a.includes("/") ? a.split("/").pop() : a;
          B({ path: a, isDir: g }), r(R), setTimeout(() => P.setFieldsValue({ name: R }), 0);
          break;
        }
        case "delete":
          G.confirm({
            title: s("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: g ? s("settings.skills.editor.deleteConfirmContentDir", { path: a, defaultValue: `Delete ${a}? This will remove the folder and all its contents.` }) : s("settings.skills.editor.deleteConfirmContent", { path: a, defaultValue: `Delete ${a}?` }),
            onOk: () => C.system.deleteSkillPath({ id: t, path: a }).then(() => {
              o.success(s("settings.skills.editor.deleted", { defaultValue: "Deleted" })), m === a && (p(null), u("")), f === a && (k(null), V(!1)), Q();
            }).catch(() => o.error(s("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          k(a), V(g), I(!0);
          break;
        case "newDir":
          k(a), V(g), E(!0);
          break;
      }
    },
    [t, H, fe, Q, m, f, P, s]
  ), pe = () => {
    if (!t || !z) return;
    const S = (P.getFieldValue("name") ?? _).trim();
    if (!S) {
      o.error(s("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!z.isDir && !/\.(md|txt)$/i.test(S)) {
      o.error(s("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const a = Ee(z.path), g = a ? `${a}/${S}` : S;
    if (g === z.path) {
      B(null);
      return;
    }
    C.system.moveSkillPath({ id: t }, { from_path: z.path, to_path: g }).then(() => {
      o.success(s("settings.skills.editor.renamed", { defaultValue: "Renamed" })), m === z.path && p(g), f === z.path && k(g), B(null), Q();
    }).catch(() => o.error(s("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, y = (S) => {
    if (!t) return;
    const a = String(S.dragNode.key), g = String(S.dragNode.title);
    let R;
    if (S.dropToGap) {
      const U = Ee(String(S.node.key));
      R = U ? `${U}/${g}` : g;
    } else
      R = `${S.node.key}/${g}`;
    R !== a && C.system.moveSkillPath({ id: t }, { from_path: a, to_path: R }).then(() => {
      o.success(s("settings.skills.editor.moved", { defaultValue: "Moved" })), m === a && p(R), f === a && k(R), Q();
    }).catch(() => o.error(s("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, W = () => {
    const S = T.trim();
    if (!S || !t) return;
    const a = X ? `${X}/${S}` : S;
    if (!/\.(md|txt)$/i.test(S)) {
      o.error(s("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    C.system.putSkillFile({ id: t, path: a }, "").then(() => {
      o.success(s("settings.skills.editor.fileCreated", { defaultValue: "File created" })), I(!1), K(""), Q(), p(a), u("");
    }).catch(() => o.error(s("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, re = () => {
    var g;
    const S = (g = N.getFieldValue("name")) == null ? void 0 : g.trim();
    if (!S || !t) return;
    const a = X ? `${X}/${S}` : S;
    C.system.createSkillDir({ id: t }, { path: a }).then(() => {
      o.success(s("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), E(!1), N.resetFields(), Q();
    }).catch(() => o.error(s("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, Ve = () => {
    const S = f || m;
    !t || !S || G.confirm({
      title: s("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: s("settings.skills.editor.deleteConfirmContent", { path: S, defaultValue: `Delete ${S}?` }),
      onOk: () => C.system.deleteSkillPath({ id: t, path: S }).then(() => {
        o.success(s("settings.skills.editor.deleted", { defaultValue: "Deleted" })), m === S && (p(null), u("")), f === S && (k(null), V(!1)), Q();
      }).catch(() => o.error(s("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return t ? /* @__PURE__ */ e.jsxs(
    te,
    {
      title: (c == null ? void 0 : c.name) ?? s("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(w, { type: "link", onClick: () => i("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      bodyStyle: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 16, flex: 1, minHeight: 0 }, children: [
          /* @__PURE__ */ e.jsxs("div", { style: { width: 260, border: "1px solid #d9d9d9", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            /* @__PURE__ */ e.jsxs(Z, { style: { marginBottom: 8, flexShrink: 0 }, children: [
              /* @__PURE__ */ e.jsx(w, { size: "small", icon: /* @__PURE__ */ e.jsx(Fe, {}), onClick: () => I(!0), children: s("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(w, { size: "small", icon: /* @__PURE__ */ e.jsx(Ze, {}), onClick: () => E(!0), children: s("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            ue ? /* @__PURE__ */ e.jsx("div", { children: s("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              at,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !0,
                expandedKeys: O,
                onExpand: (S) => A(S),
                selectedKeys: f ? [f] : [],
                onSelect: oe,
                onRightClick: me,
                onDrop: y,
                treeData: D
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            m && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(Z, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: m }),
                /* @__PURE__ */ e.jsx(w, { type: "primary", icon: /* @__PURE__ */ e.jsx(Ie, {}), disabled: !x, onClick: ne, children: s("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(w, { danger: !0, icon: /* @__PURE__ */ e.jsx(xe, {}), onClick: Ve, children: s("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              Yt(m) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  He,
                  {
                    value: n,
                    onChange: (S) => {
                      u(S.target.value), L(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(Xe, { content: yt(n) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                He,
                {
                  value: n,
                  onChange: (S) => {
                    u(S.target.value), L(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !m && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: s("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        H && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: fe,
              onContextMenu: (S) => S.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: H.x, top: H.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            it,
            {
              selectable: !1,
              items: [
                ...H.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(Je, {}), label: s("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(ve, {}), label: s("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(xe, {}), label: s("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(ht, {}), label: s("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(xt, {}), label: s("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: S }) => ye(S)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(G, { title: s("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: j, onOk: W, onCancel: () => {
          I(!1), K("");
        }, okText: s("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(h, { placeholder: s("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: T, onChange: (S) => K(S.target.value) }) }),
        /* @__PURE__ */ e.jsx(G, { title: s("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: M, onOk: () => N.validateFields().then(re), onCancel: () => E(!1), okText: s("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(l, { form: N, layout: "vertical", children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", label: s("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(h, { placeholder: s("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          G,
          {
            title: s("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!z,
            onOk: pe,
            onCancel: () => B(null),
            okText: s("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(l, { form: P, layout: "vertical", onValuesChange: (S, a) => r(a.name ?? ""), children: /* @__PURE__ */ e.jsx(l.Item, { name: "name", label: z != null && z.isDir ? s("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : s("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              h,
              {
                placeholder: z != null && z.isDir ? s("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : s("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => pe()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" })), ts = () => {
  var x;
  const { id: t } = Pe(), i = _e(), { t: s } = $("system"), { data: m, loading: p } = F(
    () => t ? C.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: f, loading: k } = F(
    () => t ? C.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t, onError: () => o.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })) }
  ), v = (m == null ? void 0 : m.data) ?? m, V = ((x = f == null ? void 0 : f.data) == null ? void 0 : x.content) ?? (f == null ? void 0 : f.content) ?? "", n = Vt(V);
  if (!t) return null;
  const u = p || k;
  return /* @__PURE__ */ e.jsx(
    te,
    {
      title: (v == null ? void 0 : v.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(w, { type: "link", onClick: () => i("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      children: /* @__PURE__ */ e.jsx(he, { spinning: u, children: /* @__PURE__ */ e.jsx("div", { style: { minHeight: 200 }, children: !u && /* @__PURE__ */ e.jsx(Xe, { content: n }) }) })
    }
  );
}, Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ts
}, Symbol.toStringTag, { value: "Module" })), ss = () => {
  const { t } = $("system"), [i] = St(), s = i.get("provider"), m = i.get("code"), p = i.get("state"), [f, k] = b(null), [v, V] = b(null), [n, u] = b(null);
  return F(async () => {
    if (!m || !p || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const x = await C.system.testOauthCallback({ code: m, state: p, provider: s });
    if (!x.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!x.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    k(x.user), V(x.user_info);
  }, {
    onSuccess: () => {
      u({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (x) => {
      u({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: x.message
      });
    }
  }), n ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    nt,
    {
      status: n.status,
      title: n.message,
      subTitle: n.error,
      extra: /* @__PURE__ */ e.jsxs(Z, { style: { display: !v || !f ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(te, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(Le, { src: v || {} }) }),
        /* @__PURE__ */ e.jsx(te, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(Le, { src: f || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(bt, {});
}, js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ss
}, Symbol.toStringTag, { value: "Module" }));
export {
  xs as O,
  ys as S,
  Vs as a,
  js as b,
  hs as i
};
