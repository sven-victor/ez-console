import { j as e } from "./vendor.js";
import { Form as a, message as r, Spin as he, Switch as oe, Select as H, Input as V, Alert as Je, Divider as Qe, Space as K, Button as C, InputNumber as de, Modal as te, Skeleton as yt, Descriptions as re, Steps as jt, Tag as ie, Table as ze, Radio as qe, Tabs as it, Tooltip as nt, Card as se, Row as Ge, Col as Ie, Checkbox as He, Empty as Le, AutoComplete as Ye, Upload as bt, Tree as Vt, Menu as kt, Collapse as _t, Typography as St, Timeline as vt, Result as wt } from "antd";
import { useTranslation as J } from "react-i18next";
import { useState as j, useEffect as Pe, useMemo as Ae, useCallback as _e } from "react";
import { useRequest as v } from "ahooks";
import { SaveOutlined as De, ReloadOutlined as xe, LoadingOutlined as Ct, CheckCircleTwoTone as Ft, StarFilled as Tt, CheckCircleOutlined as ot, StarOutlined as It, EditOutlined as Oe, CopyOutlined as rt, DeleteOutlined as we, BugOutlined as At, PlusOutlined as Me, ThunderboltOutlined as Et, ToolOutlined as Ze, SettingOutlined as zt, LockOutlined as Pt, FileTextOutlined as $e, EyeOutlined as dt, UploadOutlined as et, CalendarOutlined as Ot, ArrowLeftOutlined as ut, FolderOutlined as ct, FileOutlined as mt, FileAddOutlined as Mt, FolderAddOutlined as Rt, SearchOutlined as Lt, DownloadOutlined as Dt, WarningOutlined as Ut, DashboardOutlined as Nt, MessageOutlined as qt, SendOutlined as $t } from "@ant-design/icons";
import { a as S } from "./index.js";
import { g as tt, a as Bt, s as Ht } from "./base.js";
import { f as me, e as Wt, b as Ue, J as Kt, j as Jt, M as gt, L as Gt } from "./components.js";
import We from "react-quill";
import { useNavigate as be, useLocation as Zt, useParams as Xe, useSearchParams as Qt } from "react-router-dom";
import { c as ft, b as Xt } from "./contexts.js";
import { l as Yt, c as es, u as ts, d as ss, g as ls, b as as, e as is, f as ns, r as os } from "./system.js";
import { l as rs, b as ds } from "./authorization.js";
import { createStyles as us } from "antd-style";
import st from "react-json-view";
const Te = /^(https?:\/\/)(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*$/, cs = {
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
}, ms = ({ initialData: t, onRefresh: l }) => {
  const { t: s } = J("system"), { t: i } = J("common"), [d] = a.useForm(), [n, h] = j((t == null ? void 0 : t.provider) || "custom"), [f, x] = j((t == null ? void 0 : t.provider) === "custom" || (t == null ? void 0 : t.provider) === "autoDiscover"), [o, p] = j((t == null ? void 0 : t.enabled) || !1), [m, E] = j((t == null ? void 0 : t.auto_create_user) || !1), { loading: F, data: R, refresh: w } = v(S.system.getOauthSettings, {
    manual: !!t,
    onSuccess: (k) => {
      d.setFieldsValue(k), h(k.provider), x(k.provider === "custom" || k.provider === "autoDiscover"), p(k.enabled), E(k.auto_create_user);
    },
    onError: (k) => {
      r.error(s("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get OAuth settings", k);
    }
  });
  Pe(() => {
    t && (d.setFieldsValue(t), h(t.provider), x(t.provider === "custom" || t.provider === "autoDiscover"), p(t.enabled), E(t.auto_create_user));
  }, [t, d]);
  const T = (k) => {
    h(k), x(k === "custom" || k === "autoDiscover");
    const y = cs[k];
    y && d.setFieldsValue({
      auth_endpoint: y.endpoints.auth_endpoint,
      token_endpoint: y.endpoints.token_endpoint,
      userinfo_endpoint: y.endpoints.userinfo_endpoint,
      scope: y.scope,
      // Set field mappings
      email_field: y.email_field,
      username_field: y.username_field,
      full_name_field: y.full_name_field,
      avatar_field: y.avatar_field,
      role_field: y.role_field,
      // Set display configuration
      icon_url: y.icon_url,
      display_name: y.display_name
    });
  }, U = (k) => {
    p(k);
  }, L = (k) => {
    E(k);
  }, { loading: I, run: z } = v(S.system.updateOauthSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(s("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), l ? l() : w();
    },
    onError: (k) => {
      r.error(s("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update OAuth settings", k);
    }
  }), N = (k) => {
    z(k);
  }, D = () => {
    l ? l() : w();
  }, { loading: B, run: ne } = v(async ({ redirect_uri: k, ...y }) => {
    let W;
    return k ? W = new URL(k) : W = new URL(window.location.origin), W.pathname = tt("/system/settings/oauth/test-callback"), W.searchParams.set("provider", n), S.system.testOauthConnection({ redirect_uri: W.toString(), ...y });
  }, {
    manual: !0,
    onSuccess: ({ url: k }) => {
      window.open(k, "_blank");
    },
    onError: (k) => {
      r.error(s("settings.oauth.testConnection.failed", { defaultValue: "Failed to test connection: {{error}}", error: k.message })), console.error("Failed to test OAuth connection", k);
    }
  }), O = () => n === "custom";
  return /* @__PURE__ */ e.jsx(he, { spinning: F, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: d,
      layout: "vertical",
      onFinish: N,
      initialValues: t || R,
      children: [
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "enabled",
            label: s("settings.oauth.enabled.label", { defaultValue: "Enable OAuth" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.enabled.tooltip", { defaultValue: "Enable or disable OAuth login for the system." }),
            children: /* @__PURE__ */ e.jsx(oe, { onChange: U })
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
              V,
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
                pattern: Te,
                message: s("settings.oauth.iconUrl.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o, placeholder: "https://example.com/icon.png" })
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
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
            children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !o, autoComplete: "new-password", visibilityToggle: !1, placeholder: s("settings.oauth.clientSecret.unchanged", { defaultValue: "Leave blank to keep unchanged" }) })
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
                pattern: Te,
                message: s("settings.oauth.authEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
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
                pattern: Te,
                message: s("settings.oauth.wellknownEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              },
              {
                required: o && n === "autoDiscover",
                message: s("settings.oauth.wellknownEndpoint.required", { defaultValue: "Wellknown Endpoint is required." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
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
                pattern: Te,
                message: s("settings.oauth.tokenEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
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
                pattern: Te,
                message: s("settings.oauth.userInfoEndpoint.invalidUrl", { defaultValue: "Please enter a valid URL." })
              }
            ],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "redirect_uri",
            label: s("settings.oauth.redirectUri.label", { defaultValue: "Redirect URI" }),
            tooltip: s("settings.oauth.redirectUri.tooltip", { defaultValue: "The Redirect URI registered with the OAuth provider. This should match the one configured in your application." }),
            rules: [(k) => k.getFieldValue("redirect_uri") !== "" ? {
              pattern: Te,
              message: s("settings.oauth.redirectUri.invalidUrl", { defaultValue: "Please enter a valid URL." })
            } : { required: !1 }],
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o, placeholder: `http://${window.location.host}${tt(`/login?provider=settings.${n}`)}` })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "auto_create_user",
            label: s("settings.oauth.autoCreateUser.label", { defaultValue: "Auto Create User" }),
            valuePropName: "checked",
            tooltip: s("settings.oauth.autoCreateUser.tooltip", { defaultValue: "Automatically create a new user if one does not exist with the OAuth email." }),
            children: /* @__PURE__ */ e.jsx(oe, { onChange: L, disabled: !o })
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
            children: /* @__PURE__ */ e.jsx(V, { disabled: !o || !m })
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
          Je,
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
            children: /* @__PURE__ */ e.jsx(oe, { disabled: !o })
          }
        ),
        /* @__PURE__ */ e.jsx(Qe, { children: s("settings.oauth.fieldMapping.title", { defaultValue: "Field Mapping" }) }),
        /* @__PURE__ */ e.jsx(
          Je,
          {
            style: { marginBottom: 16 },
            type: "info",
            showIcon: !0,
            message: s("settings.oauth.fieldMapping.autoDetectHint", { defaultValue: "For preset providers, fields are typically auto-detected. Customize if needed." }),
            description: f ? "" : s("settings.oauth.fieldMapping.presetDescription", { defaultValue: 'These fields are pre-filled based on the selected provider. You can switch to "Custom" provider to edit them directly.' })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "email_field",
            label: s("settings.oauth.fieldMapping.emailField.label", { defaultValue: "Email Field" }),
            tooltip: s("settings.oauth.fieldMapping.emailField.tooltip", { defaultValue: "The field name in the user info response that contains the user email. (e.g., email)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "email", disabled: !o || !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "username_field",
            label: s("settings.oauth.fieldMapping.usernameField.label", { defaultValue: "Username Field" }),
            tooltip: s("settings.oauth.fieldMapping.usernameField.tooltip", { defaultValue: "The field name in the user info response that contains the username. (e.g., login, sub)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "login", autoComplete: "off", disabled: !o || !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "full_name_field",
            label: s("settings.oauth.fieldMapping.fullNameField.label", { defaultValue: "Full Name Field" }),
            tooltip: s("settings.oauth.fieldMapping.fullNameField.tooltip", { defaultValue: "The field name in the user info response that contains the user's full name. (e.g., name)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "name", disabled: !o || !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "avatar_field",
            label: s("settings.oauth.fieldMapping.avatarField.label", { defaultValue: "Avatar URL Field" }),
            tooltip: s("settings.oauth.fieldMapping.avatarField.tooltip", { defaultValue: "The field name in the user info response that contains the URL to the user's avatar. (e.g., picture, avatar_url)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "avatar_url", disabled: !o || !f })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "role_field",
            label: s("settings.oauth.fieldMapping.roleField.label", { defaultValue: "Role Field" }),
            tooltip: s("settings.oauth.fieldMapping.roleField.tooltip", { defaultValue: "The field name in the user info response that contains the user's role. (Optional)" }),
            children: /* @__PURE__ */ e.jsx(V, { placeholder: "role", disabled: !o || !f })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              type: "primary",
              htmlType: "submit",
              loading: I,
              icon: /* @__PURE__ */ e.jsx(De, {}),
              children: i("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              loading: B,
              onClick: async () => {
                const k = d.getFieldsValue();
                ne(k);
              },
              children: s("settings.oauth.testConnection.button", { defaultValue: "Test Connection" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              onClick: D,
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              children: i("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, gs = () => {
  const { t } = J("system"), { t: l } = J("common"), [s] = a.useForm(), { loading: i, data: d, refresh: n } = v(S.system.getSecuritySettings, {
    onSuccess: (o) => {
      s.setFieldsValue(o);
    },
    onError: (o) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", o);
    }
  }), { loading: h, run: f } = v(S.system.updateSecuritySettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), n();
    },
    onError: (o) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", o);
    }
  }), x = (o) => {
    f(o);
  };
  return /* @__PURE__ */ e.jsx(he, { spinning: i, children: /* @__PURE__ */ e.jsxs(
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
            children: /* @__PURE__ */ e.jsx(oe, {})
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
            children: /* @__PURE__ */ e.jsx(de, { min: 6, max: 32, style: { width: "100%" } })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "password_expiry_days",
            label: t("settings.security.passwordExpiry.label", { defaultValue: "Password Expiry (Days)" }),
            tooltip: t("settings.security.passwordExpiry.tooltip", { defaultValue: "Number of days after which passwords expire. Set to 0 to disable expiry." }),
            children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "login_failure_lock",
            label: t("settings.security.loginFailureLock.label", { defaultValue: "Lock Account on Login Failure" }),
            valuePropName: "checked",
            tooltip: t("settings.security.loginFailureLock.tooltip", { defaultValue: "Lock user accounts after a specified number of failed login attempts." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, p) => o.login_failure_lock !== p.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_attempts",
                label: t("settings.security.loginFailureAttempts.label", { defaultValue: "Login Failure Attempts" }),
                tooltip: t("settings.security.loginFailureAttempts.tooltip", { defaultValue: "Number of failed login attempts before locking the account." }),
                children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 10, style: { width: "100%" } })
              }
            ) : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, p) => o.login_failure_lock !== p.login_failure_lock,
            children: ({ getFieldValue: o }) => o("login_failure_lock") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "login_failure_lockout_minutes",
                label: t("settings.security.loginFailureLockoutMinutes.label", { defaultValue: "Login Failure Lockout (Minutes)" }),
                tooltip: t("settings.security.loginFailureLockoutMinutes.tooltip", { defaultValue: "Number of minutes to lock the account after a specified number of failed login attempts." }),
                children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 10, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
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
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            noStyle: !0,
            shouldUpdate: (o, p) => o.history_password_check !== p.history_password_check,
            children: ({ getFieldValue: o }) => o("history_password_check") ? /* @__PURE__ */ e.jsx(
              a.Item,
              {
                name: "history_password_count",
                label: t("settings.security.historyPasswordCount.label", { defaultValue: "Password History Count" }),
                tooltip: t("settings.security.historyPasswordCount.tooltip", { defaultValue: "Number of previous passwords to remember and prevent reuse." }),
                children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 10, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, addonAfter: t("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_timeout_minutes",
            label: t("settings.security.sessionTimeout.label", { defaultValue: "Session Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(de, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            name: "session_idle_timeout_minutes",
            label: t("settings.security.sessionIdleTimeout.label", { defaultValue: "Session Idle Timeout (Minutes)" }),
            tooltip: t("settings.security.sessionIdleTimeout.tooltip", { defaultValue: "Automatically log out users after a period of inactivity." }),
            children: /* @__PURE__ */ e.jsx(de, { min: 5, style: { width: "100%" }, addonAfter: t("settings.minutes", { defaultValue: "Minutes" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              type: "primary",
              htmlType: "submit",
              loading: h,
              icon: /* @__PURE__ */ e.jsx(De, {}),
              children: l("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              onClick: () => n(),
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              children: l("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, fs = ({ fetchItems: t, importItems: l, columns: s, ...i }) => {
  const { t: d } = J("system"), [n, h] = j([]), [f, x] = j([]), { run: o, loading: p } = v(t, {
    onError: (F) => {
      r.error(d("settings.ldap.importError", { error: `${F.message}` }));
    },
    onSuccess: (F) => {
      h(F);
    },
    manual: !0
  }), { run: m, loading: E } = v(async () => {
    for (const F of f.filter((R) => {
      const w = n.find((T) => T.ldap_dn === R);
      return !(!w || w.status === "imported");
    })) {
      const R = await l([F]);
      h((w) => [...w].map((U) => {
        for (const L of R)
          if (U.ldap_dn === L.ldap_dn)
            return { ...L, status: "imported" };
        return U;
      }));
    }
  }, {
    manual: !0
  });
  return Pe(() => {
    i.visible && (h([]), o(), x([]));
  }, [i.visible]), /* @__PURE__ */ e.jsx(
    te,
    {
      title: d("settings.ldap.importTitle"),
      ...i,
      onOk: () => {
        m();
      },
      width: 900,
      confirmLoading: E,
      loading: p,
      children: /* @__PURE__ */ e.jsx(
        ze,
        {
          rowKey: "ldap_dn",
          rowSelection: {
            onChange: (F) => {
              x(F);
            },
            getCheckboxProps: (F) => ({
              disabled: F.status === "imported"
            })
          },
          columns: s.map(({ render: F, ...R }) => F ? {
            ...R,
            render: (w, T, U) => {
              const L = f.includes(T.ldap_dn) && E && T.status !== "imported";
              return F(w, T, U, L);
            }
          } : R),
          dataSource: n,
          pagination: !1,
          scroll: { y: 400, x: "max-content" }
        }
      )
    }
  );
}, ps = () => {
  var T, U, L;
  const { t } = J("system"), [l] = a.useForm(), [s, i] = j(!1), [d, n] = j(null), [h, f] = j(!1), [x, o] = j(!1), [p] = a.useForm(), [m, E] = j(!1);
  v(S.system.getLdapSettings, {
    onSuccess: (I) => {
      l.setFieldsValue(I), E(I.enabled);
    },
    onError: (I) => {
      r.error(t("settings.ldap.loadError", { defaultValue: "Failed to load LDAP settings: {{error}}", error: `${I.message}` }));
    }
  }), Pe(() => {
    n(null);
  }, [h]);
  const F = async (I) => {
    i(!0);
    try {
      await S.system.updateLdapSettings(I), r.success(t("settings.ldap.saveSuccess", { defaultValue: "LDAP settings saved successfully." }));
    } catch {
      r.error(t("settings.ldap.saveError", { defaultValue: "Failed to save LDAP settings." }));
    } finally {
      i(!1);
    }
  }, { run: R, loading: w } = v(async (I) => {
    const z = await l.validateFields();
    return await S.system.testLdapConnection({
      ...I,
      ...z
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
        onFinish: F,
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
              children: /* @__PURE__ */ e.jsx(oe, { onChange: (I) => E(I) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.serverUrl", { defaultValue: "LDAP Server URL" }),
              name: "server_url",
              rules: [{ required: m, message: t("settings.ldap.serverUrlRequired", { defaultValue: "LDAP Server URL is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m, placeholder: "ldap://ldap.example.com:389" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindDn", { defaultValue: "Bind DN" }),
              name: "bind_dn",
              rules: [{ required: m, message: t("settings.ldap.bindDnRequired", { defaultValue: "Bind DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m, placeholder: "cn=admin,dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.bindPassword", { defaultValue: "Bind Password" }),
              name: "bind_password",
              rules: [{ required: m, message: t("settings.ldap.bindPasswordRequired", { defaultValue: "Bind Password is required." }) }],
              children: /* @__PURE__ */ e.jsx(V.Password, { hidden: !0, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.baseDn", { defaultValue: "Base DN" }),
              name: "base_dn",
              rules: [{ required: m, message: t("settings.ldap.baseDnRequired", { defaultValue: "Base DN is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m, placeholder: "dc=example,dc=com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userFilter", { defaultValue: "User Filter" }),
              name: "user_filter",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m, hidden: !0, autoComplete: "off", placeholder: "(objectClass=person)" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.userAttr", { defaultValue: "User Attribute" }),
              name: "user_attr",
              rules: [{ required: m, message: t("settings.ldap.userAttrRequired", { defaultValue: "User Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.emailAttr", { defaultValue: "Email Attribute" }),
              name: "email_attr",
              rules: [{ required: m, message: t("settings.ldap.emailAttrRequired", { defaultValue: "Email Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.displayNameAttr", { defaultValue: "Display Name Attribute" }),
              name: "display_name_attr",
              rules: [{ required: m, message: t("settings.ldap.displayNameAttrRequired", { defaultValue: "Display Name Attribute is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.defaultRole", { defaultValue: "Default Role" }),
              name: "default_role",
              rules: [{ required: m, message: t("settings.ldap.defaultRoleRequired", { defaultValue: "Default Role is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              name: "timeout",
              label: t("settings.ldap.timeout", { defaultValue: "Timeout" }),
              tooltip: t("settings.ldap.timeoutTooltip", { defaultValue: "Timeout for LDAP connection in seconds" }),
              children: /* @__PURE__ */ e.jsx(V, { type: "number", defaultValue: 15, disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(Qe, { children: t("settings.ldap.tlsDivider", { defaultValue: "TLS Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.startTls", { defaultValue: "Use StartTLS" }),
              name: "start_tls",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(oe, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.insecure", { defaultValue: "Skip TLS Verification (Insecure)" }),
              name: "insecure",
              valuePropName: "checked",
              children: /* @__PURE__ */ e.jsx(oe, { disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.caCert", { defaultValue: "CA Certificate" }),
              name: "ca_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.caCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientCert", { defaultValue: "Client Certificate" }),
              name: "client_cert",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientCertPlaceholder", { defaultValue: `-----BEGIN CERTIFICATE-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.ldap.clientKey", { defaultValue: "Client Key" }),
              name: "client_key",
              children: /* @__PURE__ */ e.jsx(V.TextArea, { placeholder: t("settings.ldap.clientKeyPlaceholder", { defaultValue: `-----BEGIN PRIVATE KEY-----
...` }), disabled: !m })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(C, { type: "primary", htmlType: "submit", loading: s, children: t("settings.ldap.save", { defaultValue: "Save Settings" }) }) }),
            /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(
              C,
              {
                disabled: !m,
                style: { marginLeft: 8 },
                onClick: () => f(!0),
                children: t("settings.ldap.testConnection", { defaultValue: "Test Connection" })
              }
            ) }),
            /* @__PURE__ */ e.jsx(me, { permissions: ["authorization:user:create"], children: /* @__PURE__ */ e.jsx(
              C,
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
      te,
      {
        title: t("settings.ldap.test.title", { defaultValue: "Test LDAP Connection" }),
        open: h,
        onCancel: () => f(!1),
        footer: null,
        children: [
          /* @__PURE__ */ e.jsxs(
            a,
            {
              form: p,
              layout: "vertical",
              onFinish: R,
              children: [
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.username", { defaultValue: "LDAP Username" }),
                    name: "username",
                    rules: [{ required: !0, message: t("settings.ldap.test.usernameRequired", { defaultValue: "Please enter LDAP username for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V, { disabled: !m })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  a.Item,
                  {
                    label: t("settings.ldap.test.password", { defaultValue: "LDAP Password" }),
                    name: "password",
                    rules: [{ required: !0, message: t("settings.ldap.test.passwordRequired", { defaultValue: "Please enter LDAP password for testing." }) }],
                    children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !m })
                  }
                ),
                /* @__PURE__ */ e.jsxs(a.Item, { children: [
                  /* @__PURE__ */ e.jsx(me, { permissions: ["system:settings:update"], children: /* @__PURE__ */ e.jsx(C, { disabled: !m, type: "primary", htmlType: "submit", children: t("settings.ldap.test.test", { defaultValue: "Test" }) }) }),
                  /* @__PURE__ */ e.jsx(
                    C,
                    {
                      style: { marginLeft: 8 },
                      onClick: () => f(!1),
                      children: t("settings.ldap.test.cancel", { defaultValue: "Cancel" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e.jsx(he, { spinning: w, children: /* @__PURE__ */ e.jsx(yt, { active: w, loading: w, children: d && (d.user ? /* @__PURE__ */ e.jsxs(re, { bordered: !0, children: [
            /* @__PURE__ */ e.jsx(re.Item, { label: "Username", span: 3, children: d.user.username }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "Email", span: 3, children: d.user.email }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "FullName", span: 3, children: d.user.full_name }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "CreatedAt", span: 3, children: d.user.created_at }),
            /* @__PURE__ */ e.jsx(re.Item, { label: "UpdatedAt", span: 3, children: d.user.updated_at })
          ] }) : /* @__PURE__ */ e.jsx(
            jt,
            {
              direction: "vertical",
              current: (T = d.message) == null ? void 0 : T.findIndex((I) => !I.success),
              status: (U = d.message) != null && U.find((I) => !I.success) ? "error" : "finish",
              items: (L = d.message) == null ? void 0 : L.map((I) => ({
                status: I.success ? "finish" : "error",
                title: I.message
              }))
            }
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      fs,
      {
        visible: x,
        onCancel: () => o(!1),
        fetchItems: () => S.system.importLdapUsers({}),
        importItems: (I) => S.system.importLdapUsers({ user_dn: I }),
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
          render: (I, z, N, D) => D ? /* @__PURE__ */ e.jsx(he, { indicator: /* @__PURE__ */ e.jsx(Ct, { spin: !0 }) }) : I ? /* @__PURE__ */ e.jsx(Ft, { twoToneColor: "#52c41a" }) : z.id ? /* @__PURE__ */ e.jsx(ie, { color: "blue", children: t("settings.ldap.importTypeBound", { defaultValue: "Bound" }) }) : /* @__PURE__ */ e.jsx(ie, { color: "green", children: t("settings.ldap.importTypeNew", { defaultValue: "New" }) })
        }]
      }
    )
  ] });
}, hs = () => {
  const { t } = J("system"), { t: l } = J("common"), [s] = a.useForm(), [i, d] = j(null), [n, h] = j(!1), [f] = a.useForm(), [x, o] = j(!1), { loading: p } = v(S.system.getSmtpSettings, {
    onSuccess: (w) => {
      s.setFieldsValue(w), o(w.enabled);
    },
    onError: (w) => {
      r.error(t("settings.smtp.loadError", { defaultValue: "Failed to load SMTP settings: {{error}}", error: `${w.message}` }));
    }
  });
  Pe(() => {
    d(null);
  }, [n]);
  const { run: m, loading: E } = v(({ port: w, ...T }) => S.system.updateSmtpSettings({ ...T, port: Number(w) }), {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.smtp.saveSuccess", { defaultValue: "SMTP settings saved successfully." }));
    },
    onError: (w) => {
      r.error(t("settings.smtp.saveError", { defaultValue: "Failed to save SMTP settings: {{error}}", error: `${w.message}` }));
    }
  }), { run: F, loading: R } = v(async (w) => {
    const { port: T, ...U } = await s.validateFields();
    return await S.system.testSmtpConnection({
      ...w,
      ...U,
      port: Number(T)
    });
  }, {
    onSuccess: (w) => {
      d(w);
    },
    onError: (w) => {
      r.error(t("settings.smtp.testError", { defaultValue: "SMTP connection test failed: {{error}}", error: `${w.message}` }));
    },
    manual: !0
  });
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(he, { spinning: p, children: /* @__PURE__ */ e.jsxs(
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
              children: /* @__PURE__ */ e.jsx(oe, { onChange: (w) => o(w) })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.host", { defaultValue: "SMTP Host" }),
              name: "host",
              rules: [{ required: x, message: t("settings.smtp.hostRequired", { defaultValue: "SMTP Host is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !x, placeholder: "smtp.example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.port", { defaultValue: "SMTP Port" }),
              name: "port",
              rules: [{ required: x, message: t("settings.smtp.portRequired", { defaultValue: "SMTP Port is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { type: "number", disabled: !x, placeholder: "587" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.username", { defaultValue: "Username" }),
              name: "username",
              rules: [{ required: x, message: t("settings.smtp.usernameRequired", { defaultValue: "Username is required." }) }],
              children: /* @__PURE__ */ e.jsx(V, { disabled: !x, placeholder: "user@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.password", { defaultValue: "Password" }),
              name: "password",
              children: /* @__PURE__ */ e.jsx(V.Password, { disabled: !x, autoComplete: "new-password" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.encryption", { defaultValue: "Encryption" }),
              name: "encryption",
              rules: [{ required: x, message: t("settings.smtp.encryptionRequired", { defaultValue: "Encryption is required." }) }],
              children: /* @__PURE__ */ e.jsxs(qe.Group, { disabled: !x, children: [
                /* @__PURE__ */ e.jsx(qe.Button, { value: "None", children: t("settings.smtp.encryptionNone", { defaultValue: "None" }) }),
                /* @__PURE__ */ e.jsx(qe.Button, { value: "SSL/TLS", children: t("settings.smtp.encryptionSslTls", { defaultValue: "SSL/TLS" }) }),
                /* @__PURE__ */ e.jsx(qe.Button, { value: "STARTTLS", children: t("settings.smtp.encryptionStartTls", { defaultValue: "STARTTLS" }) })
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
              children: /* @__PURE__ */ e.jsx(V, { disabled: !x, placeholder: "noreply@example.com" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.fromName", { defaultValue: "From Name" }),
              name: "from_name",
              children: /* @__PURE__ */ e.jsx(V, { disabled: !x, placeholder: t("settings.smtp.fromNamePlaceholder", { defaultValue: "System Notifications" }) })
            }
          ),
          /* @__PURE__ */ e.jsx(Qe, { children: t("settings.smtp.templateDivider", { defaultValue: "Template Configuration" }) }),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.resetPasswordTemplate", { defaultValue: "Reset Password Template" }),
              name: "reset_password_template",
              children: /* @__PURE__ */ e.jsx(We, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.userLockedTemplate", { defaultValue: "User Locked Template" }),
              name: "user_locked_template",
              children: /* @__PURE__ */ e.jsx(We, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: t("settings.smtp.mfaCodeTemplate", { defaultValue: "MFA Code Template" }),
              name: "mfa_code_template",
              children: /* @__PURE__ */ e.jsx(We, { theme: "snow" })
            }
          ),
          /* @__PURE__ */ e.jsxs(a.Item, { children: [
            /* @__PURE__ */ e.jsx(me, { permission: "system:setting:update", children: /* @__PURE__ */ e.jsx(C, { type: "primary", htmlType: "submit", loading: E, style: { marginRight: 8 }, children: l("save", { defaultValue: "Save" }) }) }),
            /* @__PURE__ */ e.jsx(
              C,
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
      te,
      {
        title: t("settings.smtp.testConnectionTitle", { defaultValue: "Test SMTP Connection" }),
        open: n,
        onCancel: () => h(!1),
        footer: [
          /* @__PURE__ */ e.jsx(C, { onClick: () => h(!1), children: l("cancel", { defaultValue: "Cancel" }) }, "back"),
          /* @__PURE__ */ e.jsx(C, { type: "primary", loading: R, onClick: () => f.submit(), children: t("settings.smtp.sendTestEmail", { defaultValue: "Send Test Email" }) }, "submit")
        ],
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: f,
            layout: "vertical",
            onFinish: (w) => F(w),
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
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: "test@example.com" })
                }
              ),
              i && /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.smtp.testResult", { defaultValue: "Test Result" }), children: i.success ? /* @__PURE__ */ e.jsx("span", { style: { color: "green" }, children: t("settings.smtp.testSuccess", { defaultValue: "Connection successful!" }) }) : /* @__PURE__ */ e.jsx("span", { style: { color: "red" }, children: t("settings.smtp.testFailed", { defaultValue: "Connection failed: {{error}}", error: i.message }) }) })
            ]
          }
        )
      }
    )
  ] });
}, xs = () => {
  const { t, i18n: l } = J("system"), { t: s } = J("common"), [i] = a.useForm(), { loading: d, data: n, refresh: h } = v(S.system.getSystemBaseSettings, {
    onSuccess: (p) => {
      i.setFieldsValue(p);
    },
    onError: (p) => {
      r.error(t("settings.fetchFailed", { defaultValue: "Failed to fetch settings" })), console.error("Failed to get system settings", p);
    }
  }), { loading: f, run: x } = v(S.system.updateSystemBaseSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(t("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), h();
    },
    onError: (p) => {
      r.error(t("settings.updateFailed", { defaultValue: "Failed to update settings" })), console.error("Failed to update system settings", p);
    }
  }), o = (p) => {
    x(p);
  };
  return /* @__PURE__ */ e.jsx(he, { spinning: d, children: /* @__PURE__ */ e.jsxs(
    a,
    {
      form: i,
      layout: "vertical",
      onFinish: o,
      initialValues: n,
      children: [
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.name", { defaultValue: "Name" }), children: /* @__PURE__ */ e.jsx(it, { items: [{
          key: "default",
          label: s("language.default", { defaultValue: "Default" }),
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }, ...Wt.map((p) => ({
          key: p.lang,
          label: l.language !== p.lang ? s(`language.${p.lang}`, { defaultValue: p.label, lang: p.label }) : p.label,
          forceRender: !0,
          children: /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(a.Item, { name: ["name_i18n", p.lang], children: /* @__PURE__ */ e.jsx(V, {}) }) })
        }))] }) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.logo", { defaultValue: "Logo" }), name: "logo", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(a.Item, { label: t("settings.base.homePage", { defaultValue: "Home Page" }), name: "home_page", children: /* @__PURE__ */ e.jsx(V, {}) }),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.disableLocalUserLogin", { defaultValue: "Disable Local User Login" }),
            name: "disable_local_user_login",
            tooltip: t("settings.base.disableLocalUserLoginTooltip", { defaultValue: "Disable local user login, It is only valid when other authentication methods are enabled." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(
          a.Item,
          {
            label: t("settings.base.enableMultiOrg", { defaultValue: "Enable Multi-Organization" }),
            name: "enable_multi_org",
            tooltip: t("settings.base.enableMultiOrgTooltip", { defaultValue: "Enable multi-organization feature. When enabled, organizations can be managed in the Organization Management tab." }),
            children: /* @__PURE__ */ e.jsx(oe, {})
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
            children: /* @__PURE__ */ e.jsx(oe, {})
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              type: "primary",
              htmlType: "submit",
              loading: f,
              icon: /* @__PURE__ */ e.jsx(De, {}),
              children: s("save", { defaultValue: "Save" })
            }
          ),
          /* @__PURE__ */ e.jsx(
            C,
            {
              onClick: () => h(),
              icon: /* @__PURE__ */ e.jsx(xe, {}),
              children: s("refresh", { defaultValue: "Refresh" })
            }
          )
        ] }) })
      ]
    }
  ) });
}, { TextArea: ys } = V, js = () => {
  const { t } = J("ai"), { t: l } = J("common"), s = be(), [i] = a.useForm(), [d, n] = j(!1), [h, f] = j(null), [x, o] = j(""), [p, m] = j(""), { loading: E, data: F } = v(
    () => S.ai.getAiTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (g) => {
        r.error(t("models.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch AI type definitions" })), console.error("Failed to fetch AI type definitions:", g);
      }
    }
  ), R = Ae(() => F == null ? void 0 : F.find((g) => g.provider === p), [F, p]), { loading: w, data: T, refresh: U } = v(
    () => S.ai.listAiModels({ current: 1, page_size: 100, search: x }),
    {
      refreshDeps: [x],
      onError: (g) => {
        r.error(t("models.fetchFailed", { defaultValue: "Failed to fetch AI models" })), console.error("Failed to fetch AI models:", g);
      }
    }
  ), { loading: L, run: I } = v(
    ({ config: g, ...q }) => S.ai.createAiModel({ config: g ?? {}, ...q }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.createSuccess", { defaultValue: "AI model created successfully" })), n(!1), i.resetFields(), U();
      },
      onError: (g) => {
        r.error(t("models.createFailed", { defaultValue: "Failed to create AI model" })), console.error("Failed to create AI model:", g);
      }
    }
  ), { loading: z, run: N } = v(
    ({ id: g, data: q }) => S.ai.updateAiModel({ id: g }, q),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.updateSuccess", { defaultValue: "AI model updated successfully" })), n(!1), i.resetFields(), f(null), U();
      },
      onError: (g) => {
        r.error(t("models.updateFailed", { defaultValue: "Failed to update AI model" })), console.error("Failed to update AI model:", g);
      }
    }
  ), { runAsync: D } = v(
    (g) => S.ai.deleteAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.deleteSuccess", { defaultValue: "AI model deleted successfully" })), U();
      },
      onError: (g) => {
        r.error(t("models.deleteFailed", { defaultValue: "Failed to delete AI model" })), console.error("Failed to delete AI model:", g);
      }
    }
  ), { runAsync: B } = v(
    (g) => S.ai.testAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.testSuccess", { defaultValue: "AI model connection test successful" }));
      },
      onError: (g) => {
        r.error(t("models.testFailed", { defaultValue: "AI model connection test failed" })), console.error("Failed to test AI model:", g);
      }
    }
  ), { runAsync: ne } = v(
    (g) => S.ai.setDefaultAiModel({ id: g }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("models.setDefaultSuccess", { defaultValue: "Default AI model set successfully" })), U();
      },
      onError: (g) => {
        r.error(t("models.setDefaultFailed", { defaultValue: "Failed to set default AI model" })), console.error("Failed to set default AI model:", g);
      }
    }
  ), O = () => {
    f(null), m(""), i.resetFields(), n(!0);
  }, k = (g) => {
    f(g), m(g.provider);
    const q = g.config || {}, G = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      is_default: g.is_default,
      config: q,
      // Spread config fields to form
      status: g.status,
      max_chat_tokens: g.max_chat_tokens ?? 0,
      max_chat_iterations: g.max_chat_iterations ?? 0
    };
    i.setFieldsValue(G), n(!0);
  }, y = async (g) => {
    f(null), m(g.provider), i.resetFields();
    try {
      const q = await S.ai.getAiModel({ id: g.id }), G = { ...q.config || {} };
      "api_key" in G && (G.api_key = ""), i.setFieldsValue({
        name: `${q.name} (copy)`,
        description: q.description,
        provider: q.provider,
        config: G,
        is_default: !1,
        status: "enabled",
        max_chat_tokens: q.max_chat_tokens ?? 0,
        max_chat_iterations: q.max_chat_iterations ?? 0
      }), n(!0);
    } catch {
      r.error(t("models.cloneLoadFailed", { defaultValue: "Failed to load model for clone" }));
    }
  }, W = (g) => {
    m(g), i.setFieldValue("config", void 0);
  }, ue = (g) => {
    let q = g.config ?? {};
    const G = {
      name: g.name,
      description: g.description,
      provider: g.provider,
      config: q,
      is_default: g.is_default,
      status: g.status,
      max_chat_tokens: g.max_chat_tokens ?? 0,
      max_chat_iterations: g.max_chat_iterations ?? 0
    };
    h ? N({ id: h.id, data: G }) : I(G);
  }, ge = [
    {
      title: t("models.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      render: (g, q) => /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx("span", { children: g }),
        q.is_default && /* @__PURE__ */ e.jsx(nt, { title: t("models.defaultModel", { defaultValue: "Default Model" }), children: /* @__PURE__ */ e.jsx(Tt, { style: { color: "#faad14" } }) })
      ] })
    },
    {
      title: t("models.provider", { defaultValue: "Provider" }),
      dataIndex: "provider",
      key: "provider",
      render: (g) => /* @__PURE__ */ e.jsx(ie, { color: "blue", children: g.toUpperCase() })
    },
    {
      title: t("models.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (g) => /* @__PURE__ */ e.jsx(ie, { color: g === "enabled" ? "green" : "red", children: g === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (g, q) => /* @__PURE__ */ e.jsx(Ue, { actions: [
        {
          key: "test",
          permission: "ai:models:test",
          icon: /* @__PURE__ */ e.jsx(ot, {}),
          tooltip: t("models.test", { defaultValue: "Test Connection" }),
          onClick: async () => B(q.id)
        },
        {
          key: "setDefault",
          permission: "ai:models:setDefault",
          icon: /* @__PURE__ */ e.jsx(It, {}),
          tooltip: t("models.setDefault", { defaultValue: "Set as Default" }),
          onClick: async () => ne(q.id)
        },
        {
          key: "update",
          permission: "ai:models:update",
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          tooltip: t("models.editTooltip", { defaultValue: "Edit model" }),
          onClick: async () => k(q)
        },
        {
          key: "clone",
          permission: "ai:models:create",
          icon: /* @__PURE__ */ e.jsx(rt, {}),
          tooltip: t("models.cloneTooltip", { defaultValue: "Clone as new model (re-enter API key if needed)" }),
          onClick: async () => y(q)
        },
        {
          key: "delete",
          permission: "ai:models:delete",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          tooltip: t("models.deleteTooltip", { defaultValue: "Delete model" }),
          onClick: async () => D(q.id),
          danger: !0
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ge, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsx(
        V.Search,
        {
          placeholder: t("models.searchPlaceholder", { defaultValue: "Search AI models..." }),
          style: { width: 300 },
          value: x,
          onChange: (g) => o(g.target.value),
          allowClear: !0
        }
      ) }),
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(me, { permission: "ai:trace:manage", children: /* @__PURE__ */ e.jsx(
          C,
          {
            icon: /* @__PURE__ */ e.jsx(At, {}),
            onClick: () => s("/system/settings/ai-trace"),
            children: t("trace.debug", { defaultValue: "Debug" })
          }
        ) }),
        /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(xe, {}),
            onClick: U,
            loading: w,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(me, { permission: "ai:models:create", children: /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: O,
            children: t("models.create", { defaultValue: "Create AI Model" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      ze,
      {
        columns: ge,
        dataSource: (T == null ? void 0 : T.data) || [],
        loading: w,
        rowKey: "id",
        pagination: {
          total: (T == null ? void 0 : T.total) || 0,
          current: (T == null ? void 0 : T.current) || 1,
          pageSize: (T == null ? void 0 : T.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (g, q) => l("pagination.total", {
            defaultValue: `${q[0]}-${q[1]} of ${g} items`,
            start: q[0],
            end: q[1],
            total: g
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: h ? t("models.edit", { defaultValue: "Edit AI Model" }) : t("models.create", { defaultValue: "Create AI Model" }),
        open: d,
        onCancel: () => {
          n(!1), i.resetFields(), f(null);
        },
        footer: null,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: i,
            layout: "vertical",
            onFinish: ue,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("models.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("models.nameRequired", { defaultValue: "Please enter model name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: t("models.namePlaceholder", { defaultValue: "Enter model name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("models.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    ys,
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
                      onChange: W,
                      value: p,
                      options: F == null ? void 0 : F.map((g) => ({
                        label: g.name,
                        value: g.provider
                      }))
                    }
                  )
                }
              ),
              R && /* @__PURE__ */ e.jsx(a.Item, { name: ["config"], children: /* @__PURE__ */ e.jsx(
                Kt,
                {
                  schema: R.config_schema
                }
              ) }),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "max_chat_tokens",
                  label: t("models.maxChatTokens", { defaultValue: "Max chat tokens (context / summarization)" }),
                  tooltip: t("models.maxChatTokensHelp", {
                    defaultValue: "0 uses provider config max_tokens only. Positive value sets WithChatMaxTokens for this model."
                  }),
                  children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, placeholder: "0" })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "max_chat_iterations",
                  label: t("models.maxChatIterations", { defaultValue: "Max chat iterations (tool rounds)" }),
                  tooltip: t("models.maxChatIterationsHelp", {
                    defaultValue: "0 uses default. Positive value caps tool-call iterations for this model."
                  }),
                  children: /* @__PURE__ */ e.jsx(de, { min: 0, style: { width: "100%" }, placeholder: "0" })
                }
              ),
              /* @__PURE__ */ e.jsxs(
                a.Item,
                {
                  name: "is_default",
                  valuePropName: "checked",
                  children: [
                    /* @__PURE__ */ e.jsx(oe, {}),
                    " ",
                    /* @__PURE__ */ e.jsx("span", { style: { marginLeft: 8 }, children: t("models.setAsDefault", { defaultValue: "Set as default model" }) })
                  ]
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("models.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: L || z,
                    children: h ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    onClick: () => {
                      n(!1), i.resetFields(), f(null), m("");
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
}, { TextArea: bs } = V, Vs = () => {
  var X;
  const { t } = J("system"), { t: l } = J("common"), [s] = a.useForm(), [i, d] = j(!1), [n, h] = j(null), [f, x] = j(""), [o, p] = j(!1), [m, E] = j(null), [F, R] = j(""), [w, T] = j(!1), [U, L] = j([]), [I, z] = j(), { loading: N, data: D, refresh: B } = v(
    () => S.system.listToolSets({ current: 1, page_size: 100, search: f, type: I }),
    {
      refreshDeps: [f, I],
      onError: (u) => {
        r.error(t("settings.toolsets.fetchFailed", { defaultValue: "Failed to fetch toolsets" })), console.error("Failed to fetch toolsets:", u);
      }
    }
  ), { loading: ne, data: O } = v(
    () => S.system.getToolSetTypeDefinitions(),
    {
      refreshDeps: [],
      onError: (u) => {
        r.error(t("settings.toolsets.fetchTypeDefinitionsFailed", { defaultValue: "Failed to fetch toolset type definitions" })), console.error("Failed to fetch toolset type definitions:", u);
      }
    }
  ), k = Ae(() => O == null ? void 0 : O.find((u) => u.tool_set_type === F), [O, F]), { loading: y, run: W } = v(
    (u) => S.system.createToolSet({
      ...u,
      type: u.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.createSuccess", { defaultValue: "toolset created successfully" })), d(!1), s.resetFields(), B();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.createFailed", { defaultValue: "Failed to create toolset" })), console.error("Failed to create toolset:", u);
      }
    }
  ), { loading: ue, run: ge } = v(
    ({ id: u, data: M }) => S.system.updateToolSet({ id: u }, {
      ...M,
      type: M.type
    }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.updateSuccess", { defaultValue: "toolset updated successfully" })), d(!1), s.resetFields(), h(null), B();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.updateFailed", { defaultValue: "Failed to update toolset" })), console.error("Failed to update toolset:", u);
      }
    }
  ), { run: g } = v(
    (u) => S.system.deleteToolSet({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.deleteSuccess", { defaultValue: "toolset deleted successfully" })), B();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.deleteFailed", { defaultValue: "Failed to delete toolset" })), console.error("Failed to delete toolset:", u);
      }
    }
  ), { runAsync: q } = v(
    (u) => S.system.testToolSet({ id: u }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.testSuccess", { defaultValue: "toolset connection test successful" }));
      },
      onError: (u) => {
        r.error(t("settings.toolsets.testFailed", { defaultValue: "toolset connection test failed" })), console.error("Failed to test toolset:", u);
      }
    }
  ), { loading: G, runAsync: ae } = v(
    (u) => S.system.getToolSetTools({ id: u }),
    {
      manual: !0,
      onSuccess: (u) => {
        L(u || []), T(!0);
      },
      onError: (u) => {
        r.error(t("settings.toolsets.fetchToolsFailed", { defaultValue: "Failed to fetch tools" })), console.error("Failed to fetch tools:", u);
      }
    }
  ), { runAsync: Q } = v(
    ({ id: u, status: M }) => S.system.updateToolSetStatus({ id: u }, { status: M }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.toolsets.statusUpdateSuccess", { defaultValue: "Status updated successfully" })), B();
      },
      onError: (u) => {
        r.error(t("settings.toolsets.statusUpdateFailed", { defaultValue: "Failed to update status" })), console.error("Failed to update status:", u);
      }
    }
  ), Ve = () => {
    h(null), s.resetFields(), R(""), d(!0);
  }, Se = (u) => {
    h(u), R(u.type);
    const M = { ...u };
    s.setFieldsValue(M), d(!0);
  }, pe = (u) => {
    R(u), s.setFieldValue("config", {});
  }, ve = (u) => {
    n ? ge({ id: n.id, data: u }) : W(u);
  }, ye = (u) => {
    g(u);
  }, ke = (u) => {
    E(u), p(!0);
  }, fe = (u) => {
    const M = u.status === "enabled" ? "disabled" : "enabled";
    return Q({ id: u.id, status: M });
  }, b = [
    {
      title: t("settings.toolsets.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (u, M) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: u }),
        M.is_preset ? /* @__PURE__ */ e.jsx(ie, { color: "default", children: t("settings.toolsets.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    {
      title: t("settings.toolsets.type", { defaultValue: "Type" }),
      dataIndex: "type",
      key: "type",
      render: (u) => /* @__PURE__ */ e.jsx(ie, { color: "blue", children: u.toUpperCase() })
    },
    {
      title: t("settings.toolsets.status", { defaultValue: "Status" }),
      dataIndex: "status",
      key: "status",
      render: (u) => /* @__PURE__ */ e.jsx(ie, { color: u === "enabled" ? "green" : "red", children: u === "enabled" ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: l("actions", { defaultValue: "Actions" }),
      key: "actions",
      width: 200,
      render: (u, M) => /* @__PURE__ */ e.jsx(Ue, { actions: [
        {
          key: "test",
          permission: "system:toolsets:test",
          tooltip: t("settings.toolsets.test", { defaultValue: "Test Connection" }),
          icon: /* @__PURE__ */ e.jsx(Et, {}),
          disabled: M.status !== "enabled",
          onClick: async () => q(M.id)
        },
        {
          key: "viewTools",
          icon: /* @__PURE__ */ e.jsx(Ze, {}),
          permission: "system:toolsets:view",
          disabled: M.status !== "enabled",
          tooltip: t("settings.toolsets.viewTools", { defaultValue: "View Tools" }),
          onClick: async () => ae(M.id)
        },
        {
          key: "viewConfig",
          icon: /* @__PURE__ */ e.jsx(zt, {}),
          permission: "system:toolsets:view",
          tooltip: t("settings.toolsets.viewConfig", { defaultValue: "View Configuration" }),
          onClick: async () => ke(M.config),
          disabled: !M.config
        },
        {
          key: "edit",
          permission: "system:toolsets:update",
          tooltip: M.is_preset ? t("settings.toolsets.presetDisabledEdit", {
            defaultValue: "Built-in toolsets cannot be edited here."
          }) : t("settings.toolsets.edit", { defaultValue: "Edit" }),
          icon: /* @__PURE__ */ e.jsx(Oe, {}),
          onClick: async () => Se(M),
          disabled: !!M.is_preset
        },
        {
          key: "toggleStatus",
          icon: M.status === "enabled" ? /* @__PURE__ */ e.jsx(Pt, {}) : /* @__PURE__ */ e.jsx(ot, {}),
          onClick: async () => fe(M),
          permission: "system:toolsets:update",
          tooltip: M.status === "enabled" ? l("disable", { defaultValue: "Disable" }) : l("enable", { defaultValue: "Enable" })
        },
        {
          key: "delete",
          icon: /* @__PURE__ */ e.jsx(we, {}),
          permission: "system:toolsets:delete",
          tooltip: M.is_preset ? t("settings.toolsets.presetDisabledDelete", {
            defaultValue: "Built-in toolsets cannot be deleted."
          }) : l("delete", { defaultValue: "Delete" }),
          onClick: async () => ye(M.id),
          danger: !0,
          disabled: !!M.is_preset,
          confirm: M.is_preset ? void 0 : {
            title: t("settings.toolsets.deleteConfirm", { defaultValue: "Are you sure you want to delete this toolset?" }),
            onConfirm: async () => ye(M.id),
            okText: l("confirm", { defaultValue: "Confirm" }),
            cancelText: l("cancel", { defaultValue: "Cancel" })
          }
        }
      ] }, "actions")
    }
  ];
  return /* @__PURE__ */ e.jsxs("div", { children: [
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(Ge, { justify: "space-between", align: "middle", children: [
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
          {
            placeholder: t("settings.toolsets.searchPlaceholder", { defaultValue: "Search toolsets..." }),
            style: { width: 300 },
            value: f,
            onChange: (u) => x(u.target.value),
            allowClear: !0
          }
        ),
        /* @__PURE__ */ e.jsxs(
          H,
          {
            placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
            value: I,
            onChange: (u) => z(u),
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
      /* @__PURE__ */ e.jsx(Ie, { children: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(xe, {}),
            onClick: B,
            loading: N,
            children: l("refresh", { defaultValue: "Refresh" })
          }
        ),
        /* @__PURE__ */ e.jsx(me, { permission: "system:toolsets:create", children: /* @__PURE__ */ e.jsx(
          C,
          {
            type: "primary",
            icon: /* @__PURE__ */ e.jsx(Me, {}),
            onClick: Ve,
            children: t("settings.toolsets.create", { defaultValue: "Create Toolset" })
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      ze,
      {
        columns: b,
        dataSource: (D == null ? void 0 : D.data) || [],
        loading: N,
        rowKey: "id",
        pagination: {
          total: (D == null ? void 0 : D.total) || 0,
          current: (D == null ? void 0 : D.current) || 1,
          pageSize: (D == null ? void 0 : D.page_size) || 10,
          showSizeChanger: !0,
          showQuickJumper: !0,
          showTotal: (u, M) => l("pagination.total", {
            defaultValue: `${M[0]}-${M[1]} of ${u} items`,
            start: M[0],
            end: M[1],
            total: u
          })
        }
      }
    ) }),
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: n ? t("settings.toolsets.edit", { defaultValue: "Edit Toolset" }) : t("settings.toolsets.create", { defaultValue: "Create Toolset" }),
        open: i,
        onCancel: () => {
          d(!1), s.resetFields(), h(null), R("");
        },
        footer: null,
        width: ((X = k == null ? void 0 : k.ui_schema) == null ? void 0 : X["ui:width"]) || 600,
        children: /* @__PURE__ */ e.jsxs(
          a,
          {
            form: s,
            layout: "vertical",
            onFinish: ve,
            children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: t("settings.toolsets.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: t("settings.toolsets.nameRequired", { defaultValue: "Please enter toolset name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, { placeholder: t("settings.toolsets.namePlaceholder", { defaultValue: "Enter toolset name" }) })
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: t("settings.toolsets.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(
                    bs,
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
                      loading: ne,
                      placeholder: t("settings.toolsets.typePlaceholder", { defaultValue: "Select type" }),
                      onChange: pe,
                      value: F,
                      options: O == null ? void 0 : O.map((u) => ({
                        label: u.name,
                        value: u.tool_set_type
                      }))
                    }
                  )
                }
              ),
              /* @__PURE__ */ e.jsx(
                Jt,
                {
                  name: "config",
                  schema: k == null ? void 0 : k.config_schema,
                  uiSchema: k == null ? void 0 : k.ui_schema
                }
              ),
              /* @__PURE__ */ e.jsx(a.Item, { hidden: !0, name: "status", label: t("settings.toolsets.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(
                  C,
                  {
                    type: "primary",
                    htmlType: "submit",
                    loading: y || ue,
                    children: n ? l("update", { defaultValue: "Update" }) : l("create", { defaultValue: "Create" })
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  C,
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
      te,
      {
        title: t("settings.toolsets.configuration", { defaultValue: "Configuration" }),
        open: o,
        onCancel: () => p(!1),
        footer: [
          /* @__PURE__ */ e.jsx(C, { onClick: () => p(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 600,
        children: /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto" }, children: JSON.stringify(m, null, 2) })
      }
    ),
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: t("settings.toolsets.tools", { defaultValue: "Tools" }),
        open: w,
        onCancel: () => T(!1),
        footer: [
          /* @__PURE__ */ e.jsx(C, { onClick: () => T(!1), children: l("close", { defaultValue: "Close" }) }, "close")
        ],
        width: 800,
        children: /* @__PURE__ */ e.jsx("div", { style: { maxHeight: "600px", overflow: "auto" }, children: G ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(xe, { style: { fontSize: 24 }, spin: !0 }) }) : U.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40, color: "#999" }, children: t("settings.toolsets.noTools", { defaultValue: "No tools available" }) }) : U.map((u, M) => {
          var Ce, Fe, _;
          return /* @__PURE__ */ e.jsx(
            se,
            {
              style: { marginBottom: 16 },
              title: /* @__PURE__ */ e.jsxs(K, { children: [
                /* @__PURE__ */ e.jsx(Ze, {}),
                /* @__PURE__ */ e.jsx("strong", { children: ((Ce = u.function) == null ? void 0 : Ce.name) || "Unknown" })
              ] }),
              children: /* @__PURE__ */ e.jsxs(Ge, { gutter: 16, children: [
                /* @__PURE__ */ e.jsxs(Ie, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.description", { defaultValue: "Description" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("p", { style: { marginBottom: 16 }, children: ((Fe = u.function) == null ? void 0 : Fe.description) || "-" })
                ] }),
                ((_ = u.function) == null ? void 0 : _.parameters) && /* @__PURE__ */ e.jsxs(Ie, { span: 24, children: [
                  /* @__PURE__ */ e.jsx("p", { children: /* @__PURE__ */ e.jsxs("strong", { children: [
                    t("settings.toolsets.parameters", { defaultValue: "Parameters" }),
                    ":"
                  ] }) }),
                  /* @__PURE__ */ e.jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4, overflow: "auto", fontSize: 12 }, children: JSON.stringify(u.function.parameters, null, 2) })
                ] })
              ] })
            },
            M
          );
        }) })
      }
    )
  ] });
}, { TextArea: lt } = V;
function ks(t, l) {
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
    const f = (h.tools || []).map((x) => x.name);
    if (n.tool_name === "*") {
      s[n.toolset_id] = [...f];
      continue;
    }
    f.includes(n.tool_name) ? (s[n.toolset_id] || (s[n.toolset_id] = []), s[n.toolset_id].includes(n.tool_name) || s[n.toolset_id].push(n.tool_name)) : i.push({ toolset_id: n.toolset_id, tool_name: n.tool_name });
  }
  return { selections: s, extraPatterns: i };
}
function _s(t, l) {
  const s = [], i = /* @__PURE__ */ new Set();
  for (const [d, n] of Object.entries(t))
    for (const h of n) {
      const f = `${d}|${h}`;
      i.has(f) || (i.add(f), s.push({ toolset_id: d, tool_name: h }));
    }
  for (const d of l) {
    const n = d.toolset_id.trim(), h = d.tool_name.trim();
    if (!n || !h)
      continue;
    const f = `${n}|${h}`;
    i.has(f) || (i.add(f), s.push({ toolset_id: n, tool_name: h }));
  }
  return s;
}
function pt(t, l) {
  const s = l.trim();
  return !s || t.some((i) => i.value === s) ? t : [...t, { value: s, label: s }];
}
function Ss(t, l, s, i) {
  const n = [{ value: "*", label: i }], h = /* @__PURE__ */ new Set(["*"]), f = (x, o) => {
    h.has(x) || (h.add(x), n.push({
      value: x,
      label: o ? `${x} — ${o}` : x
    }));
  };
  if (l && l !== "*") {
    const x = t.find((o) => o.id === l);
    for (const o of (x == null ? void 0 : x.tools) || [])
      f(o.name, o.description);
  } else
    for (const x of t)
      for (const o of x.tools || [])
        f(o.name, o.description);
  return pt(n, s);
}
const vs = () => {
  const { t } = J("system"), { t: l } = J("common"), s = be(), { enableSkillToolBinding: i } = ft(), [d] = a.useForm(), [n, h] = j(""), [f, x] = j(), [o, p] = j(!1), [m, E] = j(null), [F, R] = j(null), [w, T] = j(!1), [U] = a.useForm(), [L, I] = j(!1), [z, N] = j(null), [D, B] = j([]), [ne, O] = j({}), [k, y] = j([]), [W, ue] = j(!1), ge = Ae(() => [
    {
      value: "*",
      label: t("settings.skills.patternToolsetAll", { defaultValue: "* (all toolsets)" })
    },
    ...D.map((c) => ({
      value: c.id,
      label: `${c.name} (${c.id})`
    }))
  ], [D, t]), g = _e(() => {
    B([]), O({}), y([]);
  }, []), { loading: q, data: G, refresh: ae } = v(
    () => S.system.listSkills({
      current: 1,
      page_size: 100,
      search: n || void 0,
      domain: f
    }),
    {
      refreshDeps: [n, f],
      onError: () => {
        r.error(t("settings.skills.fetchFailed", { defaultValue: "Failed to fetch skills" }));
      }
    }
  ), { data: Q = [] } = v(() => S.system.listSkillDomains()), Ve = (G == null ? void 0 : G.data) ?? [], Se = (G == null ? void 0 : G.total) ?? 0, { run: pe } = v(
    (c) => S.system.deleteSkill({ id: c }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.deleteSuccess", { defaultValue: "Skill deleted" })), ae();
      },
      onError: () => {
        r.error(t("settings.skills.deleteFailed", { defaultValue: "Failed to delete skill" }));
      }
    }
  ), ve = _e(
    async (c, P) => {
      N(c.id);
      try {
        await S.system.updateSkillStatus({ id: c.id }, { status: P ? "enabled" : "disabled" }), r.success(t("settings.skills.statusUpdateSuccess", { defaultValue: "Skill status updated" })), ae();
      } catch {
        r.error(t("settings.skills.statusUpdateFailed", { defaultValue: "Failed to update skill status" }));
      } finally {
        N(null);
      }
    },
    [t, ae]
  ), { loading: ye, run: ke } = v(
    (c) => S.system.uploadSkill(c.body, c.file),
    {
      manual: !0,
      onSuccess: () => {
        r.success(t("settings.skills.uploadSuccess", { defaultValue: "Skill uploaded" })), T(!1), U.resetFields(), ae();
      },
      onError: () => {
        r.error(t("settings.skills.uploadFailed", { defaultValue: "Upload failed" }));
      }
    }
  ), fe = _e(
    async (c) => {
      ue(!0);
      try {
        const [P, $] = await Promise.all([
          S.system.listToolSets(
            { page_size: 1e3, include_tools: !0 }
          ),
          S.system.listSkillAiToolBindings(
            { id: c, current: 1, page_size: 1e3 }
          )
        ]), le = (P.data || []).filter((xt) => xt.status === "enabled");
        B(le);
        const Z = $.data || [], { selections: Y, extraPatterns: Re } = ks(Z, le);
        O(Y), y(Re);
      } catch {
        r.error(t("settings.skills.aiToolsLoadFailed", { defaultValue: "Failed to load AI tool bindings" })), g();
      } finally {
        ue(!1);
      }
    },
    [g, t]
  );
  Pe(() => {
    !o || !m || !i || fe(m.id);
  }, [o, m == null ? void 0 : m.id, i, fe]);
  const b = (c, P) => {
    O(($) => ({ ...$, [c]: P }));
  }, X = (c, P, $) => {
    O((le) => ({
      ...le,
      [c]: $ ? [...P] : []
    }));
  }, u = () => {
    E(null), R(null), d.resetFields(), g(), p(!0);
  }, M = (c) => {
    E(c), R(null), d.setFieldsValue({
      name: c.name,
      description: c.description,
      category: c.category,
      domain: c.domain
    }), g(), p(!0);
  }, Ce = (c) => {
    E(null), R(c), d.setFieldsValue({
      name: t("settings.skills.cloneNameDefault", { name: c.name, defaultValue: "{{name}} (copy)" }),
      description: c.description,
      category: c.category,
      domain: c.domain
    }), g(), p(!0);
  }, Fe = () => {
    d.validateFields().then(async (c) => {
      I(!0);
      try {
        if (m) {
          const P = {
            name: c.name,
            description: c.description ?? "",
            category: c.category ?? "",
            domain: c.domain ?? ""
          };
          if (await S.system.updateSkill({ id: m.id }, P), i) {
            const $ = _s(ne, k);
            await S.system.replaceSkillAiToolBindings(
              { id: m.id },
              { bindings: $ }
            );
          }
          r.success(t("settings.skills.updateSuccess", { defaultValue: "Skill updated" }));
        } else if (F) {
          const P = {
            source_id: F.id,
            name: c.name,
            description: c.description ?? "",
            category: c.category ?? "",
            domain: c.domain ?? ""
          }, { id: $ } = await S.system.cloneSkill(P);
          r.success(t("settings.skills.cloneSuccess", { defaultValue: "Skill cloned" })), p(!1), R(null), d.resetFields(), g(), ae(), $ && s(`/system/settings/skills/${$}/edit`);
          return;
        } else {
          const P = {
            name: c.name,
            description: c.description ?? "",
            category: c.category ?? "",
            domain: c.domain ?? "",
            content: c.content ?? ""
          };
          await S.system.createSkill(P), r.success(t("settings.skills.createSuccess", { defaultValue: "Skill created" }));
        }
        p(!1), E(null), R(null), d.resetFields(), g(), ae();
      } catch {
        r.error(
          m ? t("settings.skills.updateFailed", { defaultValue: "Failed to update skill" }) : F ? t("settings.skills.cloneFailed", { defaultValue: "Failed to clone skill" }) : t("settings.skills.createFailed", { defaultValue: "Failed to create skill" })
        );
      } finally {
        I(!1);
      }
    });
  }, _ = () => {
    var Z, Y;
    const c = (Z = U.getFieldValue("file")) == null ? void 0 : Z.fileList, P = ((Y = c == null ? void 0 : c[0]) == null ? void 0 : Y.originFileObj) ?? (c == null ? void 0 : c[0]);
    if (!P) {
      r.error(t("settings.skills.selectFile", { defaultValue: "Please select a file" }));
      return;
    }
    const $ = U.getFieldValue("category"), le = U.getFieldValue("domain");
    ke({ body: { category: $, domain: le }, file: P });
  }, A = i && m, ee = A ? 720 : 560, ce = !m && !F, Ne = [
    {
      title: t("settings.skills.name", { defaultValue: "Name" }),
      dataIndex: "name",
      key: "name",
      ellipsis: !0,
      render: (c, P) => /* @__PURE__ */ e.jsxs(K, { size: 8, wrap: !0, children: [
        /* @__PURE__ */ e.jsx("span", { children: c }),
        P.is_preset ? /* @__PURE__ */ e.jsx(ie, { color: "default", children: t("settings.skills.presetTag", { defaultValue: "Preset" }) }) : null
      ] })
    },
    { title: t("settings.skills.description", { defaultValue: "Description" }), dataIndex: "description", key: "description", ellipsis: !0 },
    { title: t("settings.skills.category", { defaultValue: "Category" }), dataIndex: "category", key: "category", render: (c) => c ? /* @__PURE__ */ e.jsx(ie, { children: c }) : "-" },
    { title: t("settings.skills.domain", { defaultValue: "Domain" }), dataIndex: "domain", key: "domain", render: (c) => c ? /* @__PURE__ */ e.jsx(ie, { color: "blue", children: c }) : "-" },
    {
      title: t("settings.skills.statusForAi", { defaultValue: "AI chat" }),
      key: "status",
      width: 120,
      render: (c, P) => {
        const $ = P.status !== "disabled";
        return /* @__PURE__ */ e.jsx(
          me,
          {
            permission: "system:skills:update",
            fallback: /* @__PURE__ */ e.jsx(ie, { color: $ ? "green" : "red", children: $ ? l("enabled", { defaultValue: "Enabled" }) : l("disabled", { defaultValue: "Disabled" }) }),
            children: /* @__PURE__ */ e.jsx(
              nt,
              {
                title: $ ? t("settings.skills.tooltipDisableSkillForAi", { defaultValue: "Disable this skill for AI chat" }) : t("settings.skills.tooltipEnableSkillForAi", { defaultValue: "Enable this skill for AI chat" }),
                children: /* @__PURE__ */ e.jsx("span", { children: /* @__PURE__ */ e.jsx(
                  oe,
                  {
                    size: "small",
                    checked: $,
                    loading: z === P.id,
                    onChange: (le) => void ve(P, le)
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
      render: (c, P) => /* @__PURE__ */ e.jsx(
        Ue,
        {
          actions: [
            {
              key: "edit_files",
              icon: /* @__PURE__ */ e.jsx($e, {}),
              tooltip: P.is_preset ? t("settings.skills.presetDisabledManageFiles", {
                defaultValue: "Built-in skills cannot edit files."
              }) : t("settings.skills.actionManageFiles", { defaultValue: "Manage files" }),
              onClick: async () => s(`/system/settings/skills/${P.id}/edit`),
              permission: "system:skills:edit_files",
              disabled: !!P.is_preset
            },
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(dt, {}),
              tooltip: t("settings.skills.actionPreview", { defaultValue: "Preview" }),
              onClick: async () => s(`/system/settings/skills/${P.id}/preview`),
              permission: "system:skills:view"
            },
            {
              key: "update",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              tooltip: P.is_preset ? t("settings.skills.presetDisabledEditMetadata", {
                defaultValue: "Built-in skills cannot change metadata."
              }) : t("settings.skills.actionEditMetadata", { defaultValue: "Edit metadata" }),
              onClick: async () => M(P),
              permission: "system:skills:update",
              disabled: !!P.is_preset
            },
            {
              key: "clone",
              icon: /* @__PURE__ */ e.jsx(rt, {}),
              tooltip: t("settings.skills.actionClone", { defaultValue: "Clone" }),
              onClick: async () => Ce(P),
              permission: "system:skills:create"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(we, {}),
              tooltip: P.is_preset ? t("settings.skills.presetDisabledDelete", {
                defaultValue: "Built-in skills cannot be deleted."
              }) : t("settings.skills.actionDelete", { defaultValue: "Delete" }),
              danger: !0,
              disabled: !!P.is_preset,
              confirm: P.is_preset ? void 0 : {
                title: t("settings.skills.deleteSkillConfirm", { defaultValue: "Delete this skill?" }),
                description: t("settings.skills.deleteSkillConfirmDescription", {
                  defaultValue: "The skill and all its files will be removed. This cannot be undone."
                }),
                okText: l("confirm", { defaultValue: "Confirm" }),
                cancelText: l("cancel", { defaultValue: "Cancel" }),
                onConfirm: async () => pe(P.id)
              },
              permission: "system:skills:delete"
            }
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ e.jsxs(
    se,
    {
      title: t("settings.skills.title", { defaultValue: "AI Agent Skills" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(
          V.Search,
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
            value: f,
            onChange: x,
            options: Q.map((c) => ({ value: c, label: c }))
          }
        ),
        /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(xe, {}), onClick: () => ae(), children: l("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: u, children: t("settings.skills.create", { defaultValue: "Create skill" }) }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:skills:create", children: /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(et, {}), onClick: () => T(!0), children: t("settings.skills.upload", { defaultValue: "Upload skill" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsx(
          ze,
          {
            rowKey: "id",
            loading: q,
            columns: Ne,
            dataSource: Ve,
            pagination: { total: Se, pageSize: 10, showSizeChanger: !0 }
          }
        ),
        /* @__PURE__ */ e.jsx(
          te,
          {
            title: m ? t("settings.skills.editSkill", { defaultValue: "Edit skill" }) : F ? t("settings.skills.cloneSkill", { defaultValue: "Clone skill" }) : t("settings.skills.createSkill", { defaultValue: "Create skill" }),
            open: o,
            onOk: Fe,
            onCancel: () => {
              p(!1), E(null), R(null), g();
            },
            confirmLoading: L,
            width: ee,
            children: /* @__PURE__ */ e.jsxs(a, { form: d, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: t("settings.skills.name", { defaultValue: "Name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "description", label: t("settings.skills.description", { defaultValue: "Description" }), children: /* @__PURE__ */ e.jsx(lt, { rows: 2 }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(H, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((c) => ({ value: c, label: c })) }) }),
              ce && /* @__PURE__ */ e.jsx(a.Item, { name: "content", label: t("settings.skills.initialContent", { defaultValue: "Initial SKILL.md content (optional)" }), children: /* @__PURE__ */ e.jsx(lt, { rows: 6, placeholder: `---
name: my-skill
description: ...
---

# My Skill` }) }),
              A && /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx(he, { spinning: W, children: D.length > 0 ? /* @__PURE__ */ e.jsxs("div", { children: [
                /* @__PURE__ */ e.jsx(K, { direction: "vertical", size: "middle", style: {
                  width: "100%",
                  overflow: "auto",
                  maxHeight: "calc(100vh - 800px)",
                  minHeight: "calc(300px)"
                }, children: D.map((c) => {
                  const P = (c.tools || []).map((Y) => Y.name), $ = ne[c.id] || [], le = P.length > 0 && $.length === P.length, Z = $.length > 0 && $.length < P.length;
                  return /* @__PURE__ */ e.jsx(
                    se,
                    {
                      size: "small",
                      title: /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                        /* @__PURE__ */ e.jsx(
                          He,
                          {
                            checked: le,
                            indeterminate: Z,
                            onChange: (Y) => X(c.id, P, Y.target.checked)
                          }
                        ),
                        /* @__PURE__ */ e.jsx("span", { children: c.name })
                      ] }),
                      extra: c.description ? /* @__PURE__ */ e.jsx("span", { children: c.description }) : void 0,
                      children: (c.tools || []).length > 0 ? /* @__PURE__ */ e.jsx(He.Group, { style: { width: "100%" }, value: $, onChange: (Y) => b(c.id, Y), children: /* @__PURE__ */ e.jsx(K, { direction: "vertical", style: { width: "100%" }, children: (c.tools || []).map((Y) => /* @__PURE__ */ e.jsx(He, { value: Y.name, children: /* @__PURE__ */ e.jsxs("div", { children: [
                        /* @__PURE__ */ e.jsx("div", { children: Y.name }),
                        Y.description && /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12 }, children: Y.description })
                      ] }) }, Y.name)) }) }) : /* @__PURE__ */ e.jsx(
                        Le,
                        {
                          image: Le.PRESENTED_IMAGE_SIMPLE,
                          description: t("settings.skills.aiToolsetNoTools", { defaultValue: "No tools available in this toolset." })
                        }
                      )
                    },
                    c.id
                  );
                }) }),
                /* @__PURE__ */ e.jsxs("div", { style: { marginTop: 12 }, children: [
                  /* @__PURE__ */ e.jsx("div", { style: { marginBottom: 8 }, children: t("settings.skills.wildcardPatterns", { defaultValue: "Wildcard patterns (optional)" }) }),
                  /* @__PURE__ */ e.jsx("div", { style: { color: "rgba(0,0,0,0.45)", fontSize: 12, marginBottom: 8 }, children: t("settings.skills.wildcardPatternsHelp", {
                    defaultValue: "Use * for toolset_id or tool_name (e.g. *:sleep for all toolsets, uuid:* for all tools in one toolset)."
                  }) }),
                  /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, children: [
                    k.map((c, P) => /* @__PURE__ */ e.jsxs(
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
                            Ye,
                            {
                              allowClear: !0,
                              style: { flex: 1, minWidth: 0 },
                              placeholder: t("settings.skills.patternToolsetPlaceholder", { defaultValue: "Toolset ID" }),
                              value: c.toolset_id,
                              options: pt(ge, c.toolset_id),
                              filterOption: ($, le) => {
                                const Z = le;
                                return `${(Z == null ? void 0 : Z.value) ?? ""} ${(Z == null ? void 0 : Z.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                              },
                              onChange: ($) => {
                                const le = typeof $ == "string" ? $ : "";
                                y(
                                  (Z) => Z.map((Y, Re) => Re === P ? { ...Y, toolset_id: le } : Y)
                                );
                              }
                            }
                          ),
                          /* @__PURE__ */ e.jsx(
                            Ye,
                            {
                              allowClear: !0,
                              style: { flex: 1, minWidth: 0 },
                              placeholder: t("settings.skills.patternToolNamePlaceholder", { defaultValue: "Tool name" }),
                              value: c.tool_name,
                              options: Ss(
                                D,
                                c.toolset_id,
                                c.tool_name,
                                t("settings.skills.patternToolNameAll", { defaultValue: "* (all tools)" })
                              ),
                              filterOption: ($, le) => {
                                const Z = le;
                                return `${(Z == null ? void 0 : Z.value) ?? ""} ${(Z == null ? void 0 : Z.label) ?? ""}`.toLowerCase().includes($.toLowerCase());
                              },
                              onChange: ($) => {
                                const le = typeof $ == "string" ? $ : "";
                                y(
                                  (Z) => Z.map((Y, Re) => Re === P ? { ...Y, tool_name: le } : Y)
                                );
                              }
                            }
                          ),
                          /* @__PURE__ */ e.jsx(
                            C,
                            {
                              type: "default",
                              danger: !0,
                              style: { flexShrink: 0 },
                              onClick: () => y(($) => $.filter((le, Z) => Z !== P)),
                              children: l("delete", { defaultValue: "Delete" })
                            }
                          )
                        ]
                      },
                      P
                    )),
                    /* @__PURE__ */ e.jsx(C, { type: "dashed", onClick: () => y((c) => [...c, { toolset_id: "", tool_name: "" }]), block: !0, children: t("settings.skills.addWildcardRow", { defaultValue: "Add pattern row" }) })
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
          te,
          {
            title: t("settings.skills.upload", { defaultValue: "Upload skill" }),
            open: w,
            onOk: _,
            onCancel: () => T(!1),
            confirmLoading: ye,
            children: /* @__PURE__ */ e.jsxs(a, { form: U, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(a.Item, { name: "file", label: t("settings.skills.file", { defaultValue: "File (.md or .zip)" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(bt, { maxCount: 1, beforeUpload: () => !1, accept: ".md,.zip", children: /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(et, {}), children: l("selectFile", { defaultValue: "Select file" }) }) }) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "category", label: t("settings.skills.category", { defaultValue: "Category" }), children: /* @__PURE__ */ e.jsx(V, {}) }),
              /* @__PURE__ */ e.jsx(a.Item, { name: "domain", label: t("settings.skills.domain", { defaultValue: "Domain" }), children: /* @__PURE__ */ e.jsx(H, { allowClear: !0, placeholder: l("optional", { defaultValue: "Optional" }), options: Q.map((c) => ({ value: c, label: c })) }) })
            ] })
          }
        )
      ]
    }
  );
}, ws = () => {
  const t = be(), { t: l } = J("system"), { t: s } = J("task"), { t: i } = J("common"), [d] = a.useForm(), { data: n } = v(S.system.listLogStorageBackends), h = (n ?? []).map((E) => ({
    value: E.id,
    label: l(`settings.task.logStorage.${E.id}`, { defaultValue: E.name })
  })), { loading: f, refresh: x } = v(S.system.getTaskSettings, {
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
  }), { loading: o, run: p } = v(S.system.updateTaskSettings, {
    manual: !0,
    onSuccess: () => {
      r.success(l("settings.updateSuccess", { defaultValue: "Settings updated successfully" })), x();
    },
    onError: () => {
      r.error(l("settings.updateFailed", { defaultValue: "Failed to update settings" }));
    }
  }), m = (E) => {
    p(E);
  };
  return /* @__PURE__ */ e.jsx(he, { spinning: f, children: /* @__PURE__ */ e.jsxs(
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
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 100, style: { width: "100%" } })
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
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
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
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
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
            children: /* @__PURE__ */ e.jsx(de, { min: 1, max: 3650, style: { width: "100%" }, addonAfter: l("settings.days", { defaultValue: "Days" }) })
          }
        ),
        /* @__PURE__ */ e.jsx(a.Item, { children: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(C, { type: "primary", htmlType: "submit", loading: o, icon: /* @__PURE__ */ e.jsx(De, {}), children: i("save", { defaultValue: "Save" }) }),
          /* @__PURE__ */ e.jsx(C, { onClick: () => x(), icon: /* @__PURE__ */ e.jsx(xe, {}), children: i("refresh", { defaultValue: "Refresh" }) }),
          /* @__PURE__ */ e.jsx(me, { permission: "task:schedule:list", children: /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(Ot, {}), onClick: () => t("/tasks/schedules"), children: s("scheduledTasks", { defaultValue: "Scheduled Tasks" }) }) })
        ] }) })
      ]
    }
  ) });
}, { TextArea: Cs } = V, Fs = () => {
  const t = be(), { t: l } = J("system"), { t: s } = J("common"), [i] = a.useForm(), [d, n] = j(!1), [h, f] = j(null), [x, o] = j(""), [p, m] = j(1), [E, F] = j(10), { loading: R, data: w, refresh: T } = v(
    () => Yt({ current: p, page_size: E, search: x }),
    {
      refreshDeps: [p, E, x],
      onError: (y) => {
        r.error(l("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organizations" })), console.error("Failed to fetch organizations:", y);
      }
    }
  ), { loading: U, run: L } = v(
    (y) => es(y),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.createSuccess", { defaultValue: "Organization created successfully" })), n(!1), i.resetFields(), f(null), T();
      },
      onError: (y) => {
        r.error((y == null ? void 0 : y.err) || l("settings.organizations.createFailed", { defaultValue: "Failed to create organization" }));
      }
    }
  ), { loading: I, run: z } = v(
    ({ id: y, ...W }) => ts({ id: y }, W),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.updateSuccess", { defaultValue: "Organization updated successfully" })), n(!1), i.resetFields(), f(null), T();
      },
      onError: (y) => {
        r.error((y == null ? void 0 : y.err) || l("settings.organizations.updateFailed", { defaultValue: "Failed to update organization" }));
      }
    }
  ), { run: N } = v(
    (y) => ss({ id: y }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(l("settings.organizations.deleteSuccess", { defaultValue: "Organization deleted successfully" })), T();
      },
      onError: (y) => {
        r.error((y == null ? void 0 : y.err) || l("settings.organizations.deleteFailed", { defaultValue: "Failed to delete organization" }));
      }
    }
  ), D = () => {
    f(null), i.resetFields(), i.setFieldsValue({ status: "active" }), n(!0);
  }, B = (y) => {
    f(y), i.setFieldsValue({
      name: y.name,
      description: y.description,
      status: y.status
    }), n(!0);
  }, ne = (y) => {
    te.confirm({
      title: l("settings.organizations.deleteConfirm", { defaultValue: "Delete Organization" }),
      content: l("settings.organizations.deleteConfirmContent", {
        defaultValue: `Are you sure you want to delete organization "${y.name}"? This action cannot be undone.`
      }),
      onOk: () => N(y.id)
    });
  }, O = () => {
    i.validateFields().then((y) => {
      h ? z({ id: h.id, ...y }) : L(y);
    });
  }, k = [
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
      render: (y) => /* @__PURE__ */ e.jsx(ie, { color: y === "active" ? "green" : "default", children: y === "active" ? l("settings.organizations.active", { defaultValue: "Active" }) : l("settings.organizations.disabled", { defaultValue: "Disabled" }) })
    },
    {
      title: s("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (y, W) => /* @__PURE__ */ e.jsx(
        Ue,
        {
          actions: [
            {
              key: "view",
              icon: /* @__PURE__ */ e.jsx(dt, {}),
              onClick: async () => t(`/system/settings/organizations/${W.id}`),
              permission: "system:organization:view"
            },
            {
              key: "edit",
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              onClick: async () => B(W),
              permission: "system:organization:update"
            },
            {
              key: "delete",
              icon: /* @__PURE__ */ e.jsx(we, {}),
              danger: !0,
              onClick: async () => ne(W),
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
      title: l("settings.organizations.title", { defaultValue: "Organization Management" }),
      extra: /* @__PURE__ */ e.jsxs(K, { children: [
        /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(xe, {}), onClick: T, children: s("refresh", { defaultValue: "Refresh" }) }),
        /* @__PURE__ */ e.jsx(me, { permission: "system:organization:create", children: /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: D, children: l("settings.organizations.create", { defaultValue: "Create Organization" }) }) })
      ] }),
      children: [
        /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: l("settings.organizations.searchPlaceholder", { defaultValue: "Search organizations..." }),
              allowClear: !0,
              onSearch: (y) => {
                o(y), m(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: k,
              dataSource: (w == null ? void 0 : w.data) || [],
              loading: R,
              rowKey: "id",
              pagination: {
                current: p,
                pageSize: E,
                total: (w == null ? void 0 : w.total) || 0,
                showSizeChanger: !0,
                showTotal: (y, W) => s("pagination.total", {
                  defaultValue: `${W[0]}-${W[1]} of ${y} items`,
                  start: W[0],
                  end: W[1],
                  total: y
                }),
                onChange: (y, W) => {
                  m(y), F(W);
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx(
          te,
          {
            title: h ? l("settings.organizations.edit", { defaultValue: "Edit Organization" }) : l("settings.organizations.create", { defaultValue: "Create Organization" }),
            open: d,
            onOk: O,
            onCancel: () => {
              n(!1), i.resetFields(), f(null);
            },
            confirmLoading: U || I,
            width: 600,
            children: /* @__PURE__ */ e.jsxs(a, { form: i, layout: "vertical", children: [
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "name",
                  label: l("settings.organizations.name", { defaultValue: "Name" }),
                  rules: [{ required: !0, message: l("settings.organizations.nameRequired", { defaultValue: "Please enter organization name" }) }],
                  children: /* @__PURE__ */ e.jsx(V, {})
                }
              ),
              /* @__PURE__ */ e.jsx(
                a.Item,
                {
                  name: "description",
                  label: l("settings.organizations.description", { defaultValue: "Description" }),
                  children: /* @__PURE__ */ e.jsx(Cs, { rows: 3 })
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
}, Ts = ({
  transformItems: t = (l) => l
}) => {
  const { t: l } = J("system"), s = be(), i = Zt(), h = i.hash.replace("#", "") || "base", { enableMultiOrg: f } = ft(), { hasPermission: x } = Xt(), o = [
    {
      key: "base",
      label: l("settings.tabs.base", { defaultValue: "Base Settings" }),
      children: /* @__PURE__ */ e.jsx(xs, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "security",
      label: l("settings.tabs.security", { defaultValue: "Security Settings" }),
      children: /* @__PURE__ */ e.jsx(gs, {}),
      hidden: !x("system:security:update")
    },
    {
      key: "oauth",
      label: l("settings.tabs.oauth", { defaultValue: "OAuth Settings" }),
      children: /* @__PURE__ */ e.jsx(ms, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ldap",
      label: l("settings.tabs.ldap", { defaultValue: "LDAP Settings" }),
      children: /* @__PURE__ */ e.jsx(ps, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "smtp",
      label: l("settings.tabs.smtp", { defaultValue: "SMTP Settings" }),
      children: /* @__PURE__ */ e.jsx(hs, {}),
      hidden: !x("system:settings:update")
    },
    {
      key: "ai-models",
      label: l("settings.tabs.aiModels", { defaultValue: "AI Models" }),
      children: /* @__PURE__ */ e.jsx(js, {}),
      hidden: !x("ai:models:view")
    },
    {
      key: "ai-toolsets",
      label: l("settings.tabs.toolSets", { defaultValue: "Tool Sets" }),
      children: /* @__PURE__ */ e.jsx(Vs, {}),
      hidden: !x("system:toolsets:view")
    },
    {
      key: "skills",
      label: l("settings.tabs.skills", { defaultValue: "Skills" }),
      children: /* @__PURE__ */ e.jsx(vs, {}),
      hidden: !x("system:skills:view")
    },
    {
      key: "task",
      label: l("settings.tabs.task", { defaultValue: "Task Settings" }),
      children: /* @__PURE__ */ e.jsx(ws, {}),
      hidden: !x("system:settings:update")
    },
    // Only show organization tab if multi-org is enabled
    ...f ? [{
      key: "organizations",
      label: l("settings.tabs.organizations", { defaultValue: "Organizations" }),
      children: /* @__PURE__ */ e.jsx(Fs, {}),
      hidden: !x("system:organization:view")
    }] : []
  ];
  return /* @__PURE__ */ e.jsx(se, { title: l("settings.title", { defaultValue: "System Settings" }), children: /* @__PURE__ */ e.jsx(
    it,
    {
      defaultActiveKey: h,
      onChange: (p) => {
        s(`${i.pathname}#${p}`);
      },
      items: t(o.filter((p) => !p.hidden), l)
    }
  ) });
}, il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ts
}, Symbol.toStringTag, { value: "Module" })), Is = () => {
  var ye, ke, fe;
  const t = be(), { id: l } = Xe(), { t: s } = J("system"), { t: i } = J("common"), [d] = a.useForm(), [n] = a.useForm(), [h, f] = j(!1), [x, o] = j(!1), [p, m] = j(null), [E, F] = j(""), [R, w] = j(1), [T, U] = j(10), { data: L, loading: I, refresh: z } = v(
    () => ls({ id: l }),
    {
      ready: !!l,
      onError: (b) => {
        r.error(s("settings.organizations.fetchFailed", { defaultValue: "Failed to fetch organization" })), console.error("Failed to fetch organization:", b);
      }
    }
  ), { data: N, loading: D, refresh: B } = v(
    () => as({ id: l, current: R, page_size: T, search: E }),
    {
      ready: !!l,
      refreshDeps: [l, R, T, E],
      onError: (b) => {
        r.error(s("settings.organizations.users.fetchFailed", { defaultValue: "Failed to fetch organization users" })), console.error("Failed to fetch organization users:", b);
      }
    }
  ), { data: ne, loading: O } = v(
    () => rs({ current: 1, page_size: 1e3 }),
    {
      ready: h
    }
  ), { data: k, loading: y } = v(
    () => ds({ organization_id: l, current: 1, page_size: 1e3 }),
    {
      ready: !!l
    }
  ), { loading: W, run: ue } = v(
    (b) => is({ id: l }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.addSuccess", { defaultValue: "User added to organization successfully" })), f(!1), d.resetFields(), B();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.addFailed", { defaultValue: "Failed to add user to organization" }));
      }
    }
  ), { loading: ge, run: g } = v(
    (b) => ns({ id: l, user_id: p == null ? void 0 : p.id }, b),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.updateRolesSuccess", { defaultValue: "User roles updated successfully" })), o(!1), n.resetFields(), m(null), B();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.updateRolesFailed", { defaultValue: "Failed to update user roles" }));
      }
    }
  ), { run: q } = v(
    (b) => os({ id: l, user_id: b }),
    {
      manual: !0,
      onSuccess: () => {
        r.success(s("settings.organizations.users.removeSuccess", { defaultValue: "User removed from organization successfully" })), B();
      },
      onError: (b) => {
        r.error((b == null ? void 0 : b.err) || s("settings.organizations.users.removeFailed", { defaultValue: "Failed to remove user from organization" }));
      }
    }
  ), G = () => {
    f(!0), d.resetFields();
  }, ae = (b) => {
    var X;
    m(b), n.setFieldsValue({
      role_ids: ((X = b.organization_roles) == null ? void 0 : X.map((u) => u.id)) || []
    }), o(!0);
  }, Q = (b) => {
    te.confirm({
      title: s("settings.organizations.users.removeConfirm", { defaultValue: "Remove User" }),
      content: s("settings.organizations.users.removeConfirmContent", {
        defaultValue: `Are you sure you want to remove user "${b.full_name || b.username}" from this organization? This will also remove all their roles in this organization.`
      }),
      onOk: () => q(b.id)
    });
  }, Ve = () => {
    d.validateFields().then((b) => {
      ue(b);
    });
  }, Se = () => {
    n.validateFields().then((b) => {
      g(b);
    });
  }, pe = ((ye = ne == null ? void 0 : ne.data) == null ? void 0 : ye.filter((b) => {
    var X;
    return !((X = N == null ? void 0 : N.data) != null && X.some((u) => u.id === b.id));
  })) || [], ve = [
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
      render: (b) => /* @__PURE__ */ e.jsx(ie, { color: b === "active" ? "green" : "default", children: b === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : b })
    },
    {
      title: s("settings.organizations.users.roles", { defaultValue: "Roles" }),
      key: "roles",
      render: (b, X) => {
        var u;
        return /* @__PURE__ */ e.jsx(K, { wrap: !0, children: ((u = X.organization_roles) == null ? void 0 : u.map((M) => /* @__PURE__ */ e.jsx(ie, { children: M.name }, M.id))) || /* @__PURE__ */ e.jsx(ie, { children: "No roles" }) });
      }
    },
    {
      title: i("actions", { defaultValue: "Actions" }),
      key: "actions",
      render: (b, X) => /* @__PURE__ */ e.jsx(
        Ue,
        {
          actions: [
            {
              key: "edit",
              label: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
              icon: /* @__PURE__ */ e.jsx(Oe, {}),
              onClick: async () => ae(X)
            },
            {
              key: "delete",
              label: s("settings.organizations.users.remove", { defaultValue: "Remove" }),
              icon: /* @__PURE__ */ e.jsx(we, {}),
              danger: !0,
              onClick: async () => Q(X)
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
        title: /* @__PURE__ */ e.jsxs(K, { children: [
          /* @__PURE__ */ e.jsx(
            C,
            {
              icon: /* @__PURE__ */ e.jsx(ut, {}),
              onClick: () => t("/system/settings#organizations"),
              children: i("back", { defaultValue: "Back" })
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { children: [
            s("settings.organizations.detail", { defaultValue: "Organization Detail" }),
            ": ",
            L == null ? void 0 : L.name
          ] })
        ] }),
        extra: /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(xe, {}), onClick: () => {
          z(), B();
        }, children: i("refresh", { defaultValue: "Refresh" }) }),
        loading: I,
        children: /* @__PURE__ */ e.jsxs(re, { column: 2, bordered: !0, children: [
          /* @__PURE__ */ e.jsx(re.Item, { label: s("settings.organizations.name", { defaultValue: "Name" }), children: L == null ? void 0 : L.name }),
          /* @__PURE__ */ e.jsx(re.Item, { label: s("settings.organizations.status", { defaultValue: "Status" }), children: /* @__PURE__ */ e.jsx(ie, { color: (L == null ? void 0 : L.status) === "active" ? "green" : "default", children: (L == null ? void 0 : L.status) === "active" ? s("settings.organizations.active", { defaultValue: "Active" }) : s("settings.organizations.disabled", { defaultValue: "Disabled" }) }) }),
          /* @__PURE__ */ e.jsx(re.Item, { label: s("settings.organizations.description", { defaultValue: "Description" }), span: 2, children: (L == null ? void 0 : L.description) || "-" })
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      se,
      {
        title: s("settings.organizations.users.title", { defaultValue: "Organization Users" }),
        extra: /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(Me, {}), onClick: G, children: s("settings.organizations.users.add", { defaultValue: "Add User" }) }),
        style: { marginTop: 16 },
        children: /* @__PURE__ */ e.jsxs(K, { direction: "vertical", style: { width: "100%" }, size: "middle", children: [
          /* @__PURE__ */ e.jsx(
            V.Search,
            {
              placeholder: s("settings.organizations.users.searchPlaceholder", { defaultValue: "Search users..." }),
              allowClear: !0,
              onSearch: (b) => {
                F(b), w(1);
              },
              style: { width: 300 }
            }
          ),
          /* @__PURE__ */ e.jsx(
            ze,
            {
              columns: ve,
              dataSource: (N == null ? void 0 : N.data) || [],
              loading: D,
              rowKey: "id",
              pagination: {
                current: R,
                pageSize: T,
                total: (N == null ? void 0 : N.total) || 0,
                showSizeChanger: !0,
                showTotal: (b) => i("pagination.total", { defaultValue: `Total ${b} items` }),
                onChange: (b, X) => {
                  w(b), U(X);
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(
      te,
      {
        title: s("settings.organizations.users.add", { defaultValue: "Add User" }),
        open: h,
        onOk: Ve,
        onCancel: () => {
          f(!1), d.resetFields();
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
                  filterOption: (b, X) => ((X == null ? void 0 : X.label) ?? "").toLowerCase().includes(b.toLowerCase()),
                  options: pe.map((b) => ({
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
                H,
                {
                  mode: "multiple",
                  placeholder: s("settings.organizations.users.selectRoles", { defaultValue: "Select roles (optional)" }),
                  loading: y,
                  options: ((ke = k == null ? void 0 : k.data) == null ? void 0 : ke.map((b) => ({
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
      te,
      {
        title: s("settings.organizations.users.editRoles", { defaultValue: "Edit Roles" }),
        open: x,
        onOk: Se,
        onCancel: () => {
          o(!1), n.resetFields(), m(null);
        },
        confirmLoading: ge,
        width: 600,
        children: /* @__PURE__ */ e.jsxs(a, { form: n, layout: "vertical", children: [
          /* @__PURE__ */ e.jsx(
            a.Item,
            {
              label: s("settings.organizations.users.user", { defaultValue: "User" }),
              children: /* @__PURE__ */ e.jsx(
                V,
                {
                  value: (p == null ? void 0 : p.full_name) || (p == null ? void 0 : p.username),
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
                  loading: y,
                  options: ((fe = k == null ? void 0 : k.data) == null ? void 0 : fe.map((b) => ({
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
}, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Is
}, Symbol.toStringTag, { value: "Module" })), As = us(({ css: t }) => ({
  fileTree: t`
    .ant-tree-node-content-wrapper{
      padding-inline: 0px;
    }
    .ant-tree-draggable-icon{
      display: none;
    }
    `
})), { TextArea: at } = V, Es = (t) => t.toLowerCase().endsWith(".md");
function ht(t) {
  return t.map((l) => {
    var s;
    return {
      key: l.path,
      title: l.name,
      isLeaf: !l.is_dir,
      icon: l.is_dir ? /* @__PURE__ */ e.jsx(ct, {}) : /* @__PURE__ */ e.jsx(mt, {}),
      children: (s = l.children) != null && s.length ? ht(l.children) : void 0
    };
  });
}
function Ke(t) {
  return t.includes("/") ? t.replace(/\/[^/]+$/, "") : "";
}
const zs = () => {
  const { styles: t } = As(), { id: l } = Xe(), s = be(), { t: i } = J("system"), [d, n] = j(null), [h, f] = j(null), [x, o] = j(!1), [p, m] = j(""), [E, F] = j(!1), [R, w] = j([]), [T, U] = j(!1), [L, I] = j(!1), [z, N] = j(""), [D] = a.useForm(), [B, ne] = j(null), [O, k] = j(null), [y, W] = j(""), [ue] = a.useForm(), { data: ge } = v(
    () => l ? S.system.getSkill({ id: l }) : Promise.reject(new Error("No id")),
    { refreshDeps: [l], ready: !!l }
  ), { data: g, loading: q, refresh: G } = v(
    () => l ? S.system.listSkillFilesTree({ id: l }) : Promise.reject(new Error("No id")),
    {
      refreshDeps: [l],
      ready: !!l,
      onSuccess: (_) => {
        if (!d) {
          for (const A of _)
            if (!A.is_dir && A.name === "SKILL.md") {
              f(A.path), n(A.path), o(!1);
              return;
            }
          for (const A of _)
            if (!A.is_dir && A.name === "SKILLS.md") {
              f(A.path), n(A.path), o(!1);
              return;
            }
        }
      }
    }
  ), ae = (ge == null ? void 0 : ge.data) ?? ge, Q = !!(ae != null && ae.is_preset), Ve = (g == null ? void 0 : g.data) ?? g ?? [], Se = Ae(() => ht(Ve), [Ve]), pe = x && h ? h : d ? Ke(d) : "";
  Pe(() => {
    d && l ? (S.system.getSkillFile({ id: l, path: d }).then((_) => m((_ == null ? void 0 : _.data) ?? _ ?? "")).catch(() => r.error(i("settings.skills.editor.failedToLoadFile", { defaultValue: "Failed to load file" }))), F(!1)) : (m(""), F(!1));
  }, [l, d, i]);
  const ve = () => {
    !l || !d || Q || S.system.putSkillFile({ id: l, path: d }, p).then(() => {
      r.success(i("settings.skills.editor.saved", { defaultValue: "Saved" })), F(!1);
    }).catch(() => r.error(i("settings.skills.editor.failedToSave", { defaultValue: "Failed to save" })));
  }, ye = (_, A) => {
    const ee = String(A.node.key), ce = !A.node.isLeaf;
    f(ee), o(ce), A.node.isLeaf ? n(ee) : n(null);
  }, ke = (_) => {
    _.event.preventDefault(), ne({
      path: String(_.node.key),
      isDir: !_.node.isLeaf,
      x: _.event.clientX,
      y: _.event.clientY
    });
  }, fe = _e(() => ne(null), []), b = _e(
    (_) => {
      if (!l || !B || Q) return;
      const { path: A, isDir: ee } = B;
      switch (fe(), _) {
        case "open":
          n(A), f(A), o(!1);
          break;
        case "rename": {
          const ce = A.includes("/") ? A.split("/").pop() : A;
          k({ path: A, isDir: ee }), W(ce), setTimeout(() => ue.setFieldsValue({ name: ce }), 0);
          break;
        }
        case "delete":
          te.confirm({
            title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
            content: ee ? i("settings.skills.editor.deleteConfirmContentDir", { path: A, defaultValue: `Delete ${A}? This will remove the folder and all its contents.` }) : i("settings.skills.editor.deleteConfirmContent", { path: A, defaultValue: `Delete ${A}?` }),
            onOk: () => S.system.deleteSkillPath({ id: l, path: A }).then(() => {
              r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === A && (n(null), m("")), h === A && (f(null), o(!1)), G();
            }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
          });
          break;
        case "newFile":
          f(A), o(ee), U(!0);
          break;
        case "newDir":
          f(A), o(ee), I(!0);
          break;
      }
    },
    [l, B, fe, G, d, h, ue, i, Q]
  ), X = () => {
    if (!l || !O || Q) return;
    const _ = (ue.getFieldValue("name") ?? y).trim();
    if (!_) {
      r.error(i("settings.skills.editor.nameRequired", { defaultValue: "Name is required" }));
      return;
    }
    if (!O.isDir && !/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.fileNameExtension", { defaultValue: "File name must end with .md or .txt" }));
      return;
    }
    const A = Ke(O.path), ee = A ? `${A}/${_}` : _;
    if (ee === O.path) {
      k(null);
      return;
    }
    S.system.moveSkillPath({ id: l }, { from_path: O.path, to_path: ee }).then(() => {
      r.success(i("settings.skills.editor.renamed", { defaultValue: "Renamed" })), d === O.path && n(ee), h === O.path && f(ee), k(null), G();
    }).catch(() => r.error(i("settings.skills.editor.failedToRename", { defaultValue: "Failed to rename" })));
  }, u = (_) => {
    if (!l || Q) return;
    const A = String(_.dragNode.key), ee = String(_.dragNode.title);
    let ce;
    if (_.dropToGap) {
      const Ne = Ke(String(_.node.key));
      ce = Ne ? `${Ne}/${ee}` : ee;
    } else
      ce = `${_.node.key}/${ee}`;
    ce !== A && S.system.moveSkillPath({ id: l }, { from_path: A, to_path: ce }).then(() => {
      r.success(i("settings.skills.editor.moved", { defaultValue: "Moved" })), d === A && n(ce), h === A && f(ce), G();
    }).catch(() => r.error(i("settings.skills.editor.failedToMove", { defaultValue: "Failed to move" })));
  }, M = () => {
    const _ = z.trim();
    if (!_ || !l || Q) return;
    const A = pe ? `${pe}/${_}` : _;
    if (!/\.(md|txt)$/i.test(_)) {
      r.error(i("settings.skills.editor.onlyMdTxtAllowed", { defaultValue: "Only .md and .txt files are allowed" }));
      return;
    }
    S.system.putSkillFile({ id: l, path: A }, "").then(() => {
      r.success(i("settings.skills.editor.fileCreated", { defaultValue: "File created" })), U(!1), N(""), G(), n(A), m("");
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFile", { defaultValue: "Failed to create file" })));
  }, Ce = () => {
    var ee;
    const _ = (ee = D.getFieldValue("name")) == null ? void 0 : ee.trim();
    if (!_ || !l || Q) return;
    const A = pe ? `${pe}/${_}` : _;
    S.system.createSkillDir({ id: l }, { path: A }).then(() => {
      r.success(i("settings.skills.editor.folderCreated", { defaultValue: "Folder created" })), I(!1), D.resetFields(), G();
    }).catch(() => r.error(i("settings.skills.editor.failedToCreateFolder", { defaultValue: "Failed to create folder" })));
  }, Fe = () => {
    const _ = h || d;
    !l || !_ || Q || te.confirm({
      title: i("settings.skills.editor.deleteConfirm", { defaultValue: "Delete?" }),
      content: i("settings.skills.editor.deleteConfirmContent", { path: _, defaultValue: `Delete ${_}?` }),
      onOk: () => S.system.deleteSkillPath({ id: l, path: _ }).then(() => {
        r.success(i("settings.skills.editor.deleted", { defaultValue: "Deleted" })), d === _ && (n(null), m("")), h === _ && (f(null), o(!1)), G();
      }).catch(() => r.error(i("settings.skills.editor.failedToDelete", { defaultValue: "Failed to delete" })))
    });
  };
  return l ? /* @__PURE__ */ e.jsxs(
    se,
    {
      title: (ae == null ? void 0 : ae.name) ?? i("settings.skills.editor.skill", { defaultValue: "Skill" }),
      extra: /* @__PURE__ */ e.jsx(C, { type: "link", onClick: () => s("/system/settings#skills"), children: i("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      style: { height: "100%", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 160px)" },
      styles: {
        body: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }
      },
      children: [
        Q ? /* @__PURE__ */ e.jsx(
          Je,
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
              /* @__PURE__ */ e.jsx(C, { size: "small", icon: /* @__PURE__ */ e.jsx(Me, {}), disabled: Q, onClick: () => U(!0), children: i("settings.skills.editor.file", { defaultValue: "File" }) }),
              /* @__PURE__ */ e.jsx(C, { size: "small", icon: /* @__PURE__ */ e.jsx(ct, {}), disabled: Q, onClick: () => I(!0), children: i("settings.skills.editor.folder", { defaultValue: "Folder" }) })
            ] }),
            q ? /* @__PURE__ */ e.jsx("div", { children: i("settings.skills.editor.loading", { defaultValue: "Loading..." }) }) : /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, overflow: "auto" }, children: /* @__PURE__ */ e.jsx(
              Vt,
              {
                showIcon: !0,
                blockNode: !0,
                draggable: !Q,
                expandedKeys: R,
                onExpand: (_) => w(_),
                selectedKeys: h ? [h] : [],
                onSelect: ye,
                onRightClick: Q ? void 0 : ke,
                onDrop: u,
                className: t.fileTree,
                treeData: Se
              }
            ) })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
            d && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              /* @__PURE__ */ e.jsxs(K, { style: { marginBottom: 8, flexShrink: 0 }, children: [
                /* @__PURE__ */ e.jsx("span", { children: d }),
                /* @__PURE__ */ e.jsx(C, { type: "primary", icon: /* @__PURE__ */ e.jsx(De, {}), disabled: Q || !E, onClick: ve, children: i("settings.skills.editor.save", { defaultValue: "Save" }) }),
                /* @__PURE__ */ e.jsx(C, { danger: !0, icon: /* @__PURE__ */ e.jsx(we, {}), disabled: Q, onClick: Fe, children: i("settings.skills.editor.delete", { defaultValue: "Delete" }) })
              ] }),
              Es(d) ? /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", gap: 16 }, children: [
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ e.jsx(
                  at,
                  {
                    value: p,
                    readOnly: Q,
                    onChange: (_) => {
                      m(_.target.value), F(!0);
                    },
                    style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                    spellCheck: !1
                  }
                ) }),
                /* @__PURE__ */ e.jsx("div", { style: { flex: 1, minHeight: 0, minWidth: 0, overflow: "auto", border: "1px solid #d9d9d9", borderRadius: 8, padding: 12 }, children: /* @__PURE__ */ e.jsx(gt, { content: Bt(p) }) })
              ] }) : /* @__PURE__ */ e.jsx(
                at,
                {
                  value: p,
                  readOnly: Q,
                  onChange: (_) => {
                    m(_.target.value), F(!0);
                  },
                  style: { flex: 1, minHeight: 0, fontFamily: "monospace", resize: "none" },
                  spellCheck: !1
                }
              )
            ] }),
            !d && /* @__PURE__ */ e.jsx("div", { style: { color: "#999" }, children: i("settings.skills.editor.selectFileToEdit", { defaultValue: "Select a file to edit" }) })
          ] })
        ] }),
        B && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: { position: "fixed", inset: 0, zIndex: 999 },
              onClick: fe,
              onContextMenu: (_) => _.preventDefault(),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { position: "fixed", left: B.x, top: B.y, zIndex: 1e3 }, children: /* @__PURE__ */ e.jsx(
            kt,
            {
              selectable: !1,
              items: [
                ...B.isDir ? [] : [{ key: "open", icon: /* @__PURE__ */ e.jsx(mt, {}), label: i("settings.skills.editor.open", { defaultValue: "Open" }) }],
                { key: "rename", icon: /* @__PURE__ */ e.jsx(Oe, {}), label: i("settings.skills.editor.rename", { defaultValue: "Rename" }) },
                { key: "delete", icon: /* @__PURE__ */ e.jsx(we, {}), label: i("settings.skills.editor.delete", { defaultValue: "Delete" }), danger: !0 },
                { key: "newFile", icon: /* @__PURE__ */ e.jsx(Mt, {}), label: i("settings.skills.editor.newFile", { defaultValue: "New file" }) },
                { key: "newDir", icon: /* @__PURE__ */ e.jsx(Rt, {}), label: i("settings.skills.editor.newFolder", { defaultValue: "New folder" }) }
              ],
              onClick: ({ key: _ }) => b(_)
            }
          ) })
        ] }),
        /* @__PURE__ */ e.jsx(te, { title: i("settings.skills.editor.newFileTitle", { defaultValue: "New file" }), open: T, onOk: M, onCancel: () => {
          U(!1), N("");
        }, okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderNewFile", { defaultValue: "filename.md or filename.txt" }), value: z, onChange: (_) => N(_.target.value) }) }),
        /* @__PURE__ */ e.jsx(te, { title: i("settings.skills.editor.newFolderTitle", { defaultValue: "New folder" }), open: L, onOk: () => D.validateFields().then(Ce), onCancel: () => I(!1), okText: i("settings.skills.editor.create", { defaultValue: "Create" }), children: /* @__PURE__ */ e.jsx(a, { form: D, layout: "vertical", children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: i("settings.skills.editor.folderName", { defaultValue: "Folder name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(V, { placeholder: i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) }) }) }) }),
        /* @__PURE__ */ e.jsx(
          te,
          {
            title: i("settings.skills.editor.renameTitle", { defaultValue: "Rename" }),
            open: !!O,
            onOk: X,
            onCancel: () => k(null),
            okText: i("settings.skills.editor.rename", { defaultValue: "Rename" }),
            destroyOnClose: !0,
            children: /* @__PURE__ */ e.jsx(a, { form: ue, layout: "vertical", onValuesChange: (_, A) => W(A.name ?? ""), children: /* @__PURE__ */ e.jsx(a.Item, { name: "name", label: O != null && O.isDir ? i("settings.skills.editor.folderName", { defaultValue: "Folder name" }) : i("settings.skills.editor.fileName", { defaultValue: "File name" }), rules: [{ required: !0 }], children: /* @__PURE__ */ e.jsx(
              V,
              {
                placeholder: O != null && O.isDir ? i("settings.skills.editor.placeholderFolder", { defaultValue: "folder-name" }) : i("settings.skills.editor.placeholderFileName", { defaultValue: "name.md" }),
                onPressEnter: () => X()
              }
            ) }) })
          }
        )
      ]
    }
  ) : null;
}, ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zs
}, Symbol.toStringTag, { value: "Module" })), Ps = () => {
  var m;
  const { id: t } = Xe(), l = be(), { t: s } = J("system"), { data: i, loading: d } = v(
    () => t ? S.system.getSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t }
  ), { data: n, loading: h } = v(
    () => t ? S.system.previewSkill({ id: t }) : Promise.reject(new Error("No id")),
    { refreshDeps: [t], ready: !!t, onError: () => r.error(s("settings.skills.previewFailed", { defaultValue: "Failed to load preview" })) }
  ), f = (i == null ? void 0 : i.data) ?? i, x = ((m = n == null ? void 0 : n.data) == null ? void 0 : m.content) ?? (n == null ? void 0 : n.content) ?? "", o = Ht(x);
  if (!t) return null;
  const p = d || h;
  return /* @__PURE__ */ e.jsx(
    se,
    {
      title: (f == null ? void 0 : f.name) ?? s("settings.skills.editor.previewTitle", { defaultValue: "Skill Preview" }),
      extra: /* @__PURE__ */ e.jsx(C, { type: "link", onClick: () => l("/system/settings#skills"), children: s("settings.skills.editor.backToSkills", { defaultValue: "Back to Skills" }) }),
      children: /* @__PURE__ */ e.jsx(he, { spinning: p, children: /* @__PURE__ */ e.jsx("div", { style: { minHeight: 200 }, children: !p && /* @__PURE__ */ e.jsx(gt, { content: o }) }) })
    }
  );
}, rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ps
}, Symbol.toStringTag, { value: "Module" })), { Text: je, Title: Os } = St, Ms = {
  llm_request: { color: "blue", icon: /* @__PURE__ */ e.jsx($t, {}) },
  llm_response: { color: "green", icon: /* @__PURE__ */ e.jsx(qt, {}) },
  token_usage: { color: "purple", icon: /* @__PURE__ */ e.jsx(Nt, {}) },
  tool_call: { color: "orange", icon: /* @__PURE__ */ e.jsx(Ze, {}) },
  tool_result: { color: "cyan", icon: /* @__PURE__ */ e.jsx($e, {}) },
  error: { color: "red", icon: /* @__PURE__ */ e.jsx(Ut, {}) },
  summary: { color: "geekblue", icon: /* @__PURE__ */ e.jsx($e, {}) }
};
function Be(t) {
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
  const { parsed: s, isJSON: i } = Be(t);
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
}, Rs = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Be(t);
  return i ? /* @__PURE__ */ e.jsxs(re, { size: "small", column: 2, bordered: !0, children: [
    s.prompt_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.promptTokens", { defaultValue: "Prompt Tokens" }),
        children: s.prompt_tokens
      }
    ),
    s.completion_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.completionTokens", {
          defaultValue: "Completion Tokens"
        }),
        children: s.completion_tokens
      }
    ),
    s.total_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.totalTokens", { defaultValue: "Total Tokens" }),
        children: s.total_tokens
      }
    ),
    s.active_tokens !== void 0 && /* @__PURE__ */ e.jsx(
      re.Item,
      {
        label: l("trace.activeTokens", { defaultValue: "Active Tokens" }),
        children: s.active_tokens
      }
    )
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, Ls = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Be(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(je, { strong: !0, children: [
        l("trace.tool", { defaultValue: "Tool" }),
        ": "
      ] }),
      /* @__PURE__ */ e.jsx(ie, { color: "blue", children: s.tool })
    ] }),
    s.arguments && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(je, { strong: !0, children: [
        l("trace.arguments", { defaultValue: "Arguments" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { content: s.arguments, maxHeight: 200 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, Ds = ({
  content: t,
  t: l
}) => {
  const { parsed: s, isJSON: i } = Be(t);
  return i ? /* @__PURE__ */ e.jsxs("div", { children: [
    s.tool_call_id && /* @__PURE__ */ e.jsxs("div", { style: { marginBottom: 8 }, children: [
      /* @__PURE__ */ e.jsxs(je, { strong: !0, children: [
        l("trace.toolCallId", { defaultValue: "Tool Call ID" }),
        ":",
        " "
      ] }),
      /* @__PURE__ */ e.jsx(je, { code: !0, children: s.tool_call_id })
    ] }),
    s.result && /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsxs(je, { strong: !0, children: [
        l("trace.result", { defaultValue: "Result" }),
        ":"
      ] }),
      /* @__PURE__ */ e.jsx(Ee, { content: s.result, maxHeight: 300 })
    ] })
  ] }) : /* @__PURE__ */ e.jsx(Ee, { content: t });
}, Us = ({ event: t, t: l }) => {
  switch (t.event_type) {
    case "token_usage":
      return /* @__PURE__ */ e.jsx(Rs, { content: t.content, t: l });
    case "tool_call":
      return /* @__PURE__ */ e.jsx(Ls, { content: t.content, t: l });
    case "tool_result":
      return /* @__PURE__ */ e.jsx(Ds, { content: t.content, t: l });
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
}, Ns = () => {
  const { t } = J("ai"), l = be(), [s, i] = j(""), [d, n] = j(""), {
    data: h,
    loading: f,
    refresh: x
  } = v(() => S.ai.getAiTraceStatus(), {
    onError: () => {
      r.error(
        t("trace.statusFetchFailed", {
          defaultValue: "Failed to fetch AI debug status"
        })
      );
    }
  }), o = (h == null ? void 0 : h.enabled) ?? !1, { loading: p, run: m } = v(
    (z) => S.ai.toggleAiTrace({ enabled: z }),
    {
      manual: !0,
      onSuccess: (z, [N]) => {
        r.success(
          N ? t("trace.enableSuccess", {
            defaultValue: "AI debug tracing enabled"
          }) : t("trace.disableSuccess", {
            defaultValue: "AI debug tracing disabled"
          })
        ), x(), N || n("");
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
    loading: F,
    run: R
  } = v(
    (z) => S.ai.getAiTraceEvents({ trace_id: z }),
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
  ), w = _e(() => {
    s.trim() && (n(s.trim()), R(s.trim()));
  }, [s, R]), T = _e(
    (z) => {
      const N = z ? t("trace.enableConfirm", {
        defaultValue: "Enable AI debug tracing? This will record detailed AI interaction data."
      }) : t("trace.disableConfirm", {
        defaultValue: "Disable AI debug tracing? All stored trace data will be deleted."
      });
      te.confirm({
        title: z ? t("trace.debugEnabled", { defaultValue: "AI Debug Enabled" }) : t("trace.debugDisabled", { defaultValue: "AI Debug Disabled" }),
        content: N,
        onOk: () => m(z)
      });
    },
    [t, m]
  ), U = _e(async () => {
    if (d)
      try {
        const z = await fetch(
          `/api/ai/trace/events/download?trace_id=${encodeURIComponent(d)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
          }
        );
        if (!z.ok) throw new Error("download failed");
        const N = await z.blob(), D = window.URL.createObjectURL(N), B = document.createElement("a");
        B.href = D, B.download = `ai-trace-${d}.json`, document.body.appendChild(B), B.click(), window.URL.revokeObjectURL(D), document.body.removeChild(B);
      } catch {
        r.error(
          t("trace.downloadFailed", {
            defaultValue: "Failed to download trace data"
          })
        );
      }
  }, [d, t]), L = Ae(() => E ?? [], [E]), I = Ae(
    () => L.map((z) => {
      const N = Ms[z.event_type] || {
        color: "gray",
        icon: /* @__PURE__ */ e.jsx($e, {})
      }, D = t(
        `trace.eventTypes.${z.event_type}`,
        { defaultValue: z.event_type }
      );
      return {
        key: z.id,
        dot: N.icon,
        color: N.color,
        children: /* @__PURE__ */ e.jsx(
          _t,
          {
            size: "small",
            defaultActiveKey: [z.id],
            items: [
              {
                key: z.id,
                label: /* @__PURE__ */ e.jsxs(K, { size: "middle", children: [
                  /* @__PURE__ */ e.jsx(ie, { color: N.color, children: D }),
                  /* @__PURE__ */ e.jsxs(je, { type: "secondary", style: { fontSize: 12 }, children: [
                    "#",
                    z.step_order
                  ] }),
                  z.duration_ms > 0 && /* @__PURE__ */ e.jsxs(je, { type: "secondary", style: { fontSize: 12 }, children: [
                    t("trace.duration", { defaultValue: "Duration" }),
                    ":",
                    " ",
                    z.duration_ms,
                    "ms"
                  ] }),
                  /* @__PURE__ */ e.jsx(je, { type: "secondary", style: { fontSize: 12 }, children: new Date(z.created_at).toLocaleString() })
                ] }),
                children: /* @__PURE__ */ e.jsx(Us, { event: z, t })
              }
            ]
          }
        )
      };
    }),
    [L, t]
  );
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
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(
              C,
              {
                icon: /* @__PURE__ */ e.jsx(ut, {}),
                onClick: () => l("/system/settings#ai-models"),
                children: t("trace.back", { defaultValue: "Back" })
              }
            ),
            /* @__PURE__ */ e.jsx(Os, { level: 4, style: { margin: 0 }, children: t("trace.title", { defaultValue: "AI Trace Viewer" }) })
          ] }),
          /* @__PURE__ */ e.jsxs(K, { children: [
            /* @__PURE__ */ e.jsx(je, { children: o ? t("trace.debugEnabled", {
              defaultValue: "AI Debug Enabled"
            }) : t("trace.debugDisabled", {
              defaultValue: "AI Debug Disabled"
            }) }),
            /* @__PURE__ */ e.jsx(
              oe,
              {
                checked: o,
                loading: f || p,
                onChange: T
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e.jsx(se, { style: { marginBottom: 16 }, children: /* @__PURE__ */ e.jsxs(K.Compact, { style: { width: "100%" }, children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          placeholder: t("trace.traceIdPlaceholder", {
            defaultValue: "Enter trace ID to search"
          }),
          value: s,
          onChange: (z) => i(z.target.value),
          onPressEnter: w,
          prefix: /* @__PURE__ */ e.jsx(Lt, {}),
          allowClear: !0
        }
      ),
      /* @__PURE__ */ e.jsx(C, { type: "primary", onClick: w, loading: F, children: t("trace.search", { defaultValue: "Search" }) }),
      d && L.length > 0 && /* @__PURE__ */ e.jsx(C, { icon: /* @__PURE__ */ e.jsx(Dt, {}), onClick: U, children: t("trace.download", { defaultValue: "Download" }) })
    ] }) }),
    F ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ e.jsx(he, { size: "large" }) }) }) : d && L.length === 0 ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(
      Le,
      {
        description: t("trace.noEvents", {
          defaultValue: "No trace events found for this trace ID"
        })
      }
    ) }) : L.length > 0 ? /* @__PURE__ */ e.jsx(se, { children: /* @__PURE__ */ e.jsx(vt, { items: I }) }) : null
  ] });
}, dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ns
}, Symbol.toStringTag, { value: "Module" })), qs = () => {
  const { t } = J("system"), [l] = Qt(), s = l.get("provider"), i = l.get("code"), d = l.get("state"), [n, h] = j(null), [f, x] = j(null), [o, p] = j(null);
  return v(async () => {
    if (!i || !d || !s)
      throw new Error(t("settings.oauth.testConnection.missingRequiredParameters", { defaultValue: "Missing required parameters" }));
    const m = await S.system.testOauthCallback({ code: i, state: d, provider: s });
    if (!m.user_info)
      throw new Error(t("settings.oauth.testConnection.responseUserInfoIsNull", { defaultValue: "response user_info is null" }));
    if (!m.user)
      throw new Error(t("settings.oauth.testConnection.responseUserIsNull", { defaultValue: "response user is null" }));
    h(m.user), x(m.user_info);
  }, {
    onSuccess: () => {
      p({
        status: "success",
        message: t("settings.oauth.testConnection.success", { defaultValue: "Successfully tested connection" })
      });
    },
    onError: (m) => {
      p({
        status: "error",
        message: t("settings.oauth.testConnection.callbackFailed", { defaultValue: "Failed to test connection" }),
        error: m.message
      });
    }
  }), o ? /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
    wt,
    {
      status: o.status,
      title: o.message,
      subTitle: o.error,
      extra: /* @__PURE__ */ e.jsxs(K, { style: { display: !f || !n ? "none" : "inline-block", textAlign: "left" }, direction: "vertical", children: [
        /* @__PURE__ */ e.jsx(se, { title: t("settings.oauth.testConnection.oauthUserInfo", { defaultValue: "OAuth User Info" }), children: /* @__PURE__ */ e.jsx(st, { src: f || {} }) }),
        /* @__PURE__ */ e.jsx(se, { title: t("settings.oauth.testConnection.loginUserInfo", { defaultValue: "Login User Info" }), style: { marginTop: 16 }, children: /* @__PURE__ */ e.jsx(st, { src: n || {} }) })
      ] })
    }
  ) }) : /* @__PURE__ */ e.jsx(Gt, {});
}, ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qs
}, Symbol.toStringTag, { value: "Module" }));
export {
  dl as A,
  nl as O,
  ol as S,
  rl as a,
  ul as b,
  il as i
};
